import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BookingClient } from "./booking-client";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default async function BookingPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Get Vehicle
  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();

  if (!vehicle) {
    notFound();
  }

  if (!vehicle.is_available) {
    redirect("/vehicles"); // Or show error
  }

  // 2. Get User (for pre-filling form)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <BookingClient vehicle={vehicle} user={user} />;
}
