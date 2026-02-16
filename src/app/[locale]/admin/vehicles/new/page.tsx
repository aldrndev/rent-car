import { VehicleForm } from "@/components/admin/vehicles/vehicle-form";

export default function NewVehiclePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Add New Vehicle</h1>
      </div>
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <VehicleForm />
      </div>
    </div>
  );
}
