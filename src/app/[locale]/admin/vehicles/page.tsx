import { AdminVehicleTable } from "@/components/admin/vehicles/vehicle-table";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";

interface AdminVehiclesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminVehiclesPage({
  searchParams,
}: AdminVehiclesPageProps) {
  const supabase = await createClient();
  const PAGE_SIZE = 10;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  // Calculate range for pagination
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: vehicles, count } = await supabase
    .from("vehicles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;

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

      <AdminVehicleTable
        vehicles={vehicles || []}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
