import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { VehicleListClient } from "./vehicle-list-client";

export const metadata: Metadata = {
  title: "Kendaraan | RentaGo",
  description:
    "Pilih mobil atau motor favorit Anda. Harga terjangkau, kendaraan terawat, siap antar.",
};

export default async function VehiclesPage() {
  const supabase = await createClient();

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .order("type", { ascending: true })
    .order("price_per_day", { ascending: true });

  return <VehicleListClient vehicles={vehicles ?? []} />;
}
