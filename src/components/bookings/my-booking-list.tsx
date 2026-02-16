"use client";

import { Bike, Calendar, Car, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { formatRupiah } from "@/lib/format";
import type { Booking, Vehicle } from "@/types/database";

// Extended Booking type to include Vehicle
type BookingWithVehicle = Booking & {
  vehicle: Vehicle;
};

interface MyBookingListProps {
  bookings: BookingWithVehicle[];
}

export function MyBookingList({ bookings }: Readonly<MyBookingListProps>) {
  const t = useTranslations();

  if (bookings.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 p-8 text-center">
        <Car className="mb-4 h-12 w-12 text-text-muted opacity-50" />
        <h3 className="text-lg font-semibold">{t("booking.noBookings")}</h3>
        <p className="mt-2 text-text-muted">{t("booking.noBookingsDesc")}</p>
        <Link
          href="/vehicles"
          className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          {t("common.browseVehicles")}
        </Link>
      </div>
    );
  }

  const getStatusBadgeVariant = (status: string) => {
    if (status === "confirmed" || status === "active") return "success";
    if (status === "cancelled") return "destructive";
    return "default";
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all hover:border-primary/50 hover:shadow-md"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Main Info */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {booking.vehicle.type === "car" ? (
                  <Car className="h-6 w-6" />
                ) : (
                  <Bike className="h-6 w-6" />
                )}
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="font-bold text-lg">{booking.vehicle.name}</h3>
                  <Badge variant="outline" className="font-mono text-xs">
                    {booking.order_id}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {booking.start_date} - {booking.end_date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {booking.pickup_location || "Store Pickup"}
                  </span>
                </div>
              </div>
            </div>

            {/* Status & Price */}
            <div className="flex flex-col items-end gap-2 md:items-end">
              <Badge
                variant={getStatusBadgeVariant(booking.status)}
                className="w-fit"
              >
                {booking.status}
              </Badge>
              <p className="text-xl font-bold text-primary">
                {formatRupiah(booking.final_price)}
              </p>
            </div>
          </div>

          {/* Action Footer (e.g. Pay Now) could go here */}
          <div className="mt-4 flex justify-end border-t border-border pt-4">
            <Link
              href={`/booking/${booking.vehicle_id}?order_id=${booking.order_id}`} // Or a dedicated detail page
              // Actually, maybe we just show details here or link to tracking page
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("common.viewDetails")}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
