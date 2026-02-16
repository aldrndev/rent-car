"use server";

import { differenceInDays, parseISO } from "date-fns";
import { getTranslations } from "next-intl/server";
import { snap } from "@/lib/midtrans";
import { createClient } from "@/lib/supabase/server";
import {
  type GuestBookingFormData,
  guestBookingSchema,
} from "@/schemas/booking";

/**
 * Generate a random order ID (ORD-XXXXXX)
 */
function generateOrderId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "ORD-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export type BookingState = {
  error?: string;
  success?: boolean;
  token?: string;
  orderId?: string;
  bookingId?: string;
  issues?: Record<string, string[]>;
} | null;

// Helper to validate and parse form data
function parseBookingData(formData: FormData): GuestBookingFormData {
  const rawData: GuestBookingFormData = {
    vehicle_id: formData.get("vehicle_id") as string,
    start_date: formData.get("start_date") as string,
    end_date: formData.get("end_date") as string,
    pickup_location: (formData.get("pickup_location") as string) || undefined,
    delivery_location:
      (formData.get("delivery_location") as string) || undefined,
    notes: (formData.get("notes") as string) || undefined,
    promo_code: (formData.get("promo_code") as string) || undefined,
    // Start guest fields
    guest_name: (formData.get("guest_name") as string) || "",
    guest_phone: (formData.get("guest_phone") as string) || "",
    guest_email: (formData.get("guest_email") as string) || "",
  };

  return rawData;
}

// Helper to validate guest/user fields
function validateBookingSchema(
  rawData: GuestBookingFormData,
  user: unknown,
): { data?: GuestBookingFormData; error?: Record<string, string[]> } {
  const result = guestBookingSchema.safeParse(rawData);

  if (result.success) {
    return { data: result.data };
  }

  // If validation failed
  if (user) {
    // If user is logged in, ignore guest field errors
    const errors = result.error.flatten().fieldErrors;
    const relevantErrors: Record<string, string[]> = {};

    for (const [key, value] of Object.entries(errors)) {
      if (!key.startsWith("guest_") && value) {
        relevantErrors[key] = value;
      }
    }

    if (Object.keys(relevantErrors).length === 0) {
      return { data: rawData };
    }
    return { error: relevantErrors };
  }

  // Guest validation failed
  return { error: result.error.flatten().fieldErrors };
}

export async function createBookingAction(_: BookingState, formData: FormData) {
  const t = await getTranslations("booking");
  const supabase = await createClient();

  // Get current user (if logged in)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Parse and Validate
  const rawData = parseBookingData(formData);
  const validation = validateBookingSchema(rawData, user);

  if (validation.error) {
    return { error: "Validation failed", issues: validation.error };
  }

  const validatedData = validation.data as GuestBookingFormData;
  const { vehicle_id, start_date, end_date } = validatedData;

  // 1. Fetch vehicle
  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicle_id)
    .single();

  if (!vehicle) {
    return { error: t("errors.vehicleNotFound") };
  }

  // 2. Check availability
  const { count } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("vehicle_id", vehicle_id)
    .neq("status", "cancelled")
    .neq("status", "expire")
    .or(`and(start_date.lte.${end_date},end_date.gte.${start_date})`);

  if (count && count > 0) {
    return { error: t("errors.unavailableDates") };
  }

  // 3. Calculate price
  const start = parseISO(start_date);
  const end = parseISO(end_date);
  const days = differenceInDays(end, start) + 1; // Inclusive

  if (days < 1) {
    return { error: t("errors.invalidDates") };
  }

  const totalPrice = days * vehicle.price_per_day;
  let discountAmount = 0;

  // NOTE: Check promo code (Phase 8 or later in this phase)
  if (validatedData.promo_code === "WELCOME50K") {
    discountAmount = 50000;
  }

  const finalPrice = Math.max(0, totalPrice - discountAmount);
  const orderId = generateOrderId();

  // 4. Create booking
  const { data: booking, error: insertError } = await supabase
    .from("bookings")
    .insert({
      order_id: orderId,
      user_id: user?.id ?? null,
      vehicle_id: vehicle.id,
      start_date: start_date,
      end_date: end_date,
      total_days: days,
      total_price: totalPrice,
      discount_amount: discountAmount,
      final_price: finalPrice,
      status: "pending",
      pickup_location: validatedData.pickup_location,
      delivery_location: validatedData.delivery_location,
      notes: validatedData.notes,
      promo_code: validatedData.promo_code,
      guest_name: user ? undefined : validatedData.guest_name,
      guest_phone: user ? undefined : validatedData.guest_phone,
      guest_email: user ? undefined : validatedData.guest_email,
    })
    .select()
    .single();

  if (insertError || !booking) {
    console.error("Booking insert error:", insertError);
    return { error: t("errors.createBookingFailed") };
  }

  // 5. Create Midtrans Transaction
  // We need customer details for Snap
  const customerDetails = user
    ? {
        first_name: user.user_metadata?.full_name || "Customer",
        email: user.email,
        phone: user.user_metadata?.phone || "",
      }
    : {
        first_name: validatedData.guest_name,
        email: validatedData.guest_email,
        phone: validatedData.guest_phone,
      };

  const transactionParams = {
    transaction_details: {
      order_id: orderId,
      gross_amount: finalPrice,
    },
    item_details: [
      {
        id: vehicle.id,
        price: vehicle.price_per_day,
        quantity: days,
        name: `${vehicle.name} (${days} days)`,
      },
      ...(discountAmount > 0
        ? [
            {
              id: "DISCOUNT",
              price: -discountAmount,
              quantity: 1,
              name: "Promo Discount",
            },
          ]
        : []),
    ],
    customer_details: customerDetails,
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_APP_URL}/booking/status?order_id=${orderId}`,
    },
  };

  try {
    const transaction = await snap.createTransaction(transactionParams);

    // 6. Update booking with snap_token
    await supabase.from("payments").insert({
      booking_id: booking.id,
      amount: finalPrice,
      snap_token: transaction.token,
      status: "pending",
    });

    return {
      success: true,
      token: transaction.token,
      orderId: orderId,
      bookingId: booking.id,
    };
  } catch (err) {
    console.error("Midtrans error:", err);
    return { error: t("errors.paymentGatewayFailed") };
  }
}
