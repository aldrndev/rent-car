import { notFound } from "next/navigation";
import { VehicleForm } from "@/components/admin/vehicles/vehicle-form";
import { createClient } from "@/lib/supabase/server";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Vehicle</h1>
      </div>
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <VehicleForm vehicle={vehicle} />
      </div>
    </div>
  );
}
