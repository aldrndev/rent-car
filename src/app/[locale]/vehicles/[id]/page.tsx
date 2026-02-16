import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { VehicleDetailClient } from "./vehicle-detail-client";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("name, brand, type, price_per_day, description")
    .eq("id", id)
    .single();

  if (!vehicle) return { title: "Not Found" };

  return {
    title: `${vehicle.name} | RentaGo`,
    description:
      vehicle.description ??
      `Sewa ${vehicle.name} (${vehicle.brand}) mulai dari Rp ${vehicle.price_per_day.toLocaleString("id-ID")}/hari.`,
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();

  if (!vehicle) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <VehicleDetailClient vehicle={vehicle} user={user} />;
}
