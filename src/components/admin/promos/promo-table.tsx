"use client";

import { Edit, Plus, Trash } from "lucide-react";
import { deletePromoAction } from "@/app/[locale]/admin/promos/actions";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

interface Promo {
  id: string;
  code: string;
  description: string | null;
  discount_amount: number;
  min_booking_days: number;
  usage_limit: number | null;
  used_count: number;
  is_active: boolean;
}

import { PaginationControls } from "@/components/ui/pagination-controls";

interface PromoTableProps {
  promos: Promo[];
  currentPage: number;
  totalPages: number;
}

export function PromoTable({
  promos,
  currentPage,
  totalPages,
}: Readonly<PromoTableProps>) {
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this promo?")) {
      await deletePromoAction(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-semibold">All Promos</h2>
          <Link
            href="/admin/promos/new"
            className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" />
            Add Promo
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-hover text-text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Discount</th>
                <th className="px-4 py-3 font-medium">Min Days</th>
                <th className="px-4 py-3 font-medium">Usage</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {promos.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-text-muted"
                  >
                    No promos found.
                  </td>
                </tr>
              ) : (
                promos.map((promo) => (
                  <tr key={promo.id}>
                    <td className="px-4 py-3 font-medium">{promo.code}</td>
                    <td className="px-4 py-3">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(promo.discount_amount)}
                    </td>
                    <td className="px-4 py-3">{promo.min_booking_days} days</td>
                    <td className="px-4 py-3">
                      {promo.used_count} / {promo.usage_limit ?? "∞"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={promo.is_active ? "success" : "secondary"}
                      >
                        {promo.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/promos/${promo.id}`}
                          className="rounded p-1 text-text-muted hover:bg-surface-hover hover:text-primary"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(promo.id)}
                          className="rounded p-1 text-text-muted hover:bg-error/10 hover:text-error"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PaginationControls currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
