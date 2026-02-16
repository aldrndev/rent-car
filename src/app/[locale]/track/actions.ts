"use server";

import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";

interface TrackBookingData {
  order_id: string;
  phone: string;
}

export async function trackBookingAction(data: TrackBookingData) {
  const t = await getTranslations("booking");
  const supabase = await createClient();

  // Call the RPC function 'get_guest_booking'
  // Parameters must match what was defined in SQL
  const { data: booking, error } = await supabase.rpc("get_guest_booking", {
    p_order_id: data.order_id,
    p_guest_phone: data.phone,
  });

  if (error) {
    console.error("Tracking RPC error:", error);
    return { error: t("errors.trackingFailed") };
  }

  if (!booking || booking.length === 0) {
    return { error: t("errors.bookingNotFound") };
  }

  // RPC usually returns an array, take the first one
  const foundBooking = booking[0];

  // Fetch vehicle details
  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", foundBooking.vehicle_id)
    .single();

  return { data: { ...foundBooking, vehicle } };
}
