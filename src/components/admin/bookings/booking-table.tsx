"use client";

import { format } from "date-fns";
import {
  CheckCircle,
  CheckSquare,
  MoreHorizontal,
  PlayCircle,
  XCircle,
} from "lucide-react";
import { useTransition } from "react";
import { updateBookingStatusAction } from "@/app/[locale]/admin/bookings/actions";

interface Booking {
  id: string;
  order_id: string;
  guest_name?: string;
  guest_phone?: string;
  user?: {
    full_name: string;
    email: string;
  };
  vehicle: {
    name: string;
    image_url: string;
  };
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  created_at: string;
}

import { PaginationControls } from "@/components/ui/pagination-controls";

interface AdminBookingTableProps {
  bookings: Booking[];
  currentPage: number;
  totalPages: number;
}

export function AdminBookingTable({
  bookings,
  currentPage,
  totalPages,
}: Readonly<AdminBookingTableProps>) {
  const [isPending, startTransition] = useTransition();

  const handleStatusUpdate = (
    id: string,
    newStatus: "pending" | "confirmed" | "completed" | "cancelled" | "active",
  ) => {
    startTransition(async () => {
      const result = await updateBookingStatusAction(id, newStatus);
      if (result.error) {
        alert(result.error);
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background/50 text-text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Vehicle</th>
                <th className="px-6 py-4 font-medium">Dates</th>
                <th className="px-6 py-4 font-medium">Total Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-text-muted"
                  >
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="transition-colors hover:bg-muted/50"
                  >
                    <td className="px-6 py-4 font-medium">
                      {booking.order_id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">
                        {booking.user?.full_name ||
                          booking.guest_name ||
                          "Guest"}
                      </div>
                      <div className="text-xs text-text-muted">
                        {booking.user?.email || booking.guest_phone || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4">{booking.vehicle.name}</td>
                    <td className="px-6 py-4">
                      <div className="whitespace-nowrap">
                        {format(new Date(booking.start_date), "dd MMM")} -{" "}
                        {format(new Date(booking.end_date), "dd MMM yyyy")}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      Rp {booking.total_price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block text-left group">
                        <button
                          type="button"
                          className="p-2 hover:bg-muted rounded-full"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                        <div className="absolute right-0 top-full mt-1 hidden w-48 origin-top-right rounded-md border border-border bg-surface shadow-lg group-hover:block z-10">
                          <div className="py-1">
                            {booking.status === "pending" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusUpdate(booking.id, "confirmed")
                                }
                                disabled={isPending}
                                className="flex w-full items-center px-4 py-2 text-sm hover:bg-muted"
                              >
                                <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                                Confirm
                              </button>
                            )}
                            {booking.status === "confirmed" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusUpdate(booking.id, "active")
                                }
                                disabled={isPending}
                                className="flex w-full items-center px-4 py-2 text-sm hover:bg-muted"
                              >
                                <PlayCircle className="mr-2 h-4 w-4 text-purple-500" />
                                Start Rental
                              </button>
                            )}
                            {booking.status === "active" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusUpdate(booking.id, "completed")
                                }
                                disabled={isPending}
                                className="flex w-full items-center px-4 py-2 text-sm hover:bg-muted"
                              >
                                <CheckSquare className="mr-2 h-4 w-4 text-green-500" />
                                Complete
                              </button>
                            )}
                            {booking.status !== "cancelled" &&
                              booking.status !== "completed" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusUpdate(booking.id, "cancelled")
                                  }
                                  disabled={isPending}
                                  className="flex w-full items-center px-4 py-2 text-sm text-error hover:bg-muted"
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Cancel
                                </button>
                              )}
                          </div>
                        </div>
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
