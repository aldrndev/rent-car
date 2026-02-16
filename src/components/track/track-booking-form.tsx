"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  Search,
  User,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trackBookingAction } from "@/app/[locale]/track/actions";
import { formatRupiah } from "@/lib/format";
import type { Booking, Vehicle } from "@/types/database";

// Define schema here since it's specific to this form
const trackBookingSchema = z.object({
  order_id: z.string().min(1, "Order ID is required"),
  phone: z.string().min(1, "Phone number is required"),
});

type TrackBookingFormData = z.infer<typeof trackBookingSchema>;

type BookingWithVehicle = Booking & { vehicle: Vehicle | null };

export function TrackBookingForm() {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [booking, setBooking] = useState<BookingWithVehicle | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrackBookingFormData>({
    resolver: zodResolver(trackBookingSchema),
  });

  const onSubmit = (data: TrackBookingFormData) => {
    setError(null);
    setBooking(null);
    startTransition(async () => {
      const result = await trackBookingAction(data);
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setBooking(result.data as BookingWithVehicle);
      }
    });
  };

  const statusColor = (status: string) => {
    if (status === "confirmed" || status === "active" || status === "paid")
      return "text-green-500 bg-green-500/10 border-green-500/20";
    if (status === "cancelled" || status === "expired")
      return "text-red-500 bg-red-500/10 border-red-500/20";
    if (status === "pending" || status === "awaiting_payment")
      return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    return "text-gray-500 bg-gray-500/10 border-gray-500/20";
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-xl shadow-black/5">
        <div className="border-b border-border bg-surface-hover/50 p-8 text-center backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
            <Search className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold">{t("track.title")}</h2>
          <p className="mt-2 text-text-muted">{t("track.subtitle")}</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="order_id"
                  className="text-sm font-medium text-text"
                >
                  {t("track.orderId")}
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <CreditCard className="h-4 w-4 text-text-muted" />
                  </div>
                  <input
                    id="order_id"
                    type="text"
                    placeholder="ORD-..."
                    {...register("order_id")}
                    className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-text-muted/50 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </div>
                {errors.order_id && (
                  <p className="text-xs text-error">
                    {errors.order_id.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-text"
                >
                  {t("track.phone")}
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-4 w-4 text-text-muted" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="08..."
                    {...register("phone")}
                    className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-text-muted/50 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-error">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 disabled:pointer-events-none disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("common.loading")}
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
                  {t("track.trackBtn")}
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
              <XCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>
      </div>

      {booking && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-xl shadow-black/5">
            <div className="relative h-48 w-full bg-surface-hover">
              {booking.vehicle?.image_url ? (
                <Image
                  src={booking.vehicle.image_url}
                  alt={booking.vehicle.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface-hover text-text-muted">
                  No Image Available
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <h3 className="text-2xl font-bold">
                    {booking.vehicle?.name ?? "Unknown Vehicle"}
                  </h3>
                  <p className="text-white/80">
                    {booking.vehicle?.brand} {booking.vehicle?.model}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${statusColor(
                    booking.status,
                  )} border-white/20 bg-white/20 text-white`}
                >
                  {booking.status === "confirmed" && (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  )}
                  {booking.status}
                </div>
              </div>
            </div>

            <div className="divide-y divide-border bg-surface">
              <div className="grid grid-cols-2 gap-4 p-6">
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">
                    {t("booking.startDate")}
                  </p>
                  <p className="font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    {format(new Date(booking.start_date), "dd MMMM yyyy", {
                      locale: id,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">
                    {t("booking.endDate")}
                  </p>
                  <p className="font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    {format(new Date(booking.end_date), "dd MMMM yyyy", {
                      locale: id,
                    })}
                  </p>
                </div>
                <div className="col-span-2 mt-2 rounded-xl bg-surface-hover p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-muted">
                      Total ({booking.total_days} {t("common.days")})
                    </span>
                    <span className="text-xl font-bold text-primary">
                      {formatRupiah(booking.final_price)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="mb-4 font-semibold text-text">
                  Customer Details
                </h4>
                <div className="grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-text-muted">Name</p>
                    <p className="font-medium">{booking.guest_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Phone</p>
                    <p className="font-medium">{booking.guest_phone}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-text-muted">
                      {t("track.orderId")}
                    </p>
                    <p className="font-mono font-medium">{booking.order_id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
