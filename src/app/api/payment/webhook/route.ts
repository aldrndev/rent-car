import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { coreApi } from "@/lib/midtrans";
import type { Database } from "@/types/database";

// Admin client to bypass RLS for webhook updates
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables for admin client");
}

const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export async function POST(request: NextRequest) {
  try {
    const notificationJson = await request.json();

    // 1. Verify notification signature (optional but recommended)
    // For now, we trust the notification if it parses correctly
    // or checks order_id format

    // Get transaction status
    const statusResponse =
      await coreApi.transaction.notification(notificationJson);
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    // Map Midtrans status to our status
    // Payment status: pending, settlement, expire, cancel, deny, refund
    // Booking status: pending, paid, confirmed, cancelled, completed

    let _paymentStatus = "pending";
    let bookingStatus = "pending";

    if (transactionStatus === "capture") {
      if (fraudStatus === "challenge") {
        _paymentStatus = "challenge"; // NOTE: Requires manual review in Midtrans dashboard
      } else if (fraudStatus === "accept") {
        _paymentStatus = "settlement"; // Success
        bookingStatus = "paid";
      }
    } else if (transactionStatus === "settlement") {
      _paymentStatus = "settlement";
      bookingStatus = "paid";
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "deny" ||
      transactionStatus === "expire"
    ) {
      _paymentStatus = "failed"; // custom mapping
      bookingStatus = "cancelled";
    } else if (transactionStatus === "pending") {
      _paymentStatus = "pending";
      bookingStatus = "meeting_point"; // or awaiting_payment
    }

    // 2. Update Database

    // Find booking first to get ID
    const { data: booking } = await supabaseAdmin
      .from("bookings")
      .select("id")
      .eq("order_id", orderId)
      .single();

    if (!booking) {
      console.error(`Booking not found for Order ID: ${orderId}`);
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    // Update Payment Record
    // We assume there's a payment record created or we creates one now if missing
    // In actions.ts we created a payment record.
    // We update based on booking_id

    const { error: paymentError } = await supabaseAdmin
      .from("payments")
      .update({
        status: statusResponse.transaction_status, // Use exact midtrans status for traceability
        // We can store full response if we want: raw_response: statusResponse
        updated_at: new Date().toISOString(),
      })
      .eq("booking_id", booking.id);

    if (paymentError) {
      console.error("Payment update error:", paymentError);
    }

    // Update Booking Status
    // Only if it's a significant change
    if (bookingStatus !== "pending" && bookingStatus !== "meeting_point") {
      const { error: bookingError } = await supabaseAdmin
        .from("bookings")
        .update({
          status: bookingStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", booking.id);

      if (bookingError) {
        console.error("Booking update error:", bookingError);
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Midtrans Webhook Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
