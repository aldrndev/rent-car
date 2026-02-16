import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { AdminVehicleTable } from "@/components/admin/vehicles/vehicle-table";
import { Link } from "@/i18n/navigation";
import { createClient, createClient } from "@/lib/supabase/server";

export default async function AdminVehiclesPage() {
  const supabase = await createClient();

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vehicles</h1>
          <p className="text-text-muted">Manage your fleet.</p>
        </div>
        <Link
          href="/admin/vehicles/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          Add Vehicle
        </Link>
      </div>

      <AdminVehicleTable vehicles={vehicles || []} />
    </div>
  );
}
