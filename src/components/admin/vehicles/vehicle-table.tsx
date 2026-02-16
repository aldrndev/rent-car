"use client";

import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { formatRupiah } from "@/lib/format";
import type { Vehicle } from "@/types/database";

interface AdminVehicleTableProps {
  vehicles: Vehicle[];
}

export function AdminVehicleTable({
  vehicles,
}: Readonly<AdminVehicleTableProps>) {
  // biome-ignore lint/suspicious/noTodo: Pending implementation
  // TODO: Implement pagination and search

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-background/50 text-text-muted">
          <tr>
            <th className="px-6 py-4 font-medium">Vehicle</th>
            <th className="px-6 py-4 font-medium">Type</th>
            <th className="px-6 py-4 font-medium">Price/Day</th>
            <th className="px-6 py-4 font-medium">Transmission</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {vehicles.map((vehicle) => (
            <tr
              key={vehicle.id}
              className="group transition-colors hover:bg-background/50"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-gray-100">
                    {vehicle.image_url ? (
                      <Image
                        src={vehicle.image_url}
                        alt={vehicle.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                        No Img
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-text">{vehicle.name}</div>
                    <div className="text-xs text-text-muted">
                      {vehicle.brand} {vehicle.model} ({vehicle.year})
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 capitalize">{vehicle.type}</td>
              <td className="px-6 py-4 font-medium text-text">
                {formatRupiah(vehicle.price_per_day)}
              </td>
              <td className="px-6 py-4 capitalize">{vehicle.transmission}</td>
              <td className="px-6 py-4">
                <Badge variant={vehicle.is_available ? "success" : "secondary"}>
                  {vehicle.is_available ? "Available" : "Unavailable"}
                </Badge>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/vehicles/${vehicle.id}`}
                    className="p-2 text-text-muted transition-colors hover:text-primary"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    className="p-2 text-text-muted transition-colors hover:text-destructive"
                    onClick={async () => {
                      if (
                        confirm(
                          "Are you sure you want to delete this vehicle? Actions cannot be undone.",
                        )
                      ) {
                        // Call delete action
                        await import(
                          "@/app/[locale]/admin/vehicles/actions"
                        ).then((mod) => mod.deleteVehicleAction(vehicle.id));
                        // Optional: toast notification or refresh
                        // Since server action revalidates path, specific refresh might not be needed if this is a server component parent.
                        // But this is a client component.
                        // We might need router.refresh() to see changes immediately if using optimisitic updates or just rely on Next.js server action behavior.
                      }
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {vehicles.length === 0 && (
        <div className="p-8 text-center text-text-muted">
          No vehicles found.
        </div>
      )}
    </div>
  );
}
