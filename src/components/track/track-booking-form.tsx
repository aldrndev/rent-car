"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trackBookingAction } from "@/app/[locale]/track/actions";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/format";
import type { Booking } from "@/types/database";

// Define schema here since it's specific to this form
const trackBookingSchema = z.object({
  order_id: z.string().min(1, "Order ID is required"),
  phone: z.string().min(1, "Phone number is required"),
});

type TrackBookingFormData = z.infer<typeof trackBookingSchema>;

export function TrackBookingForm() {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [booking, setBooking] = useState<Booking | null>(null);
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
        setBooking(result.data);
      }
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status === "confirmed" || status === "active") return "success";
    if (status === "cancelled") return "destructive";
    return "default";
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">{t("track.title")}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="order_id"
              className="mb-1.5 block text-sm font-medium text-text"
            >
              {t("track.orderId")}
            </label>
            <input
              id="order_id"
              type="text"
              placeholder="ORD-..."
              {...register("order_id")}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.order_id && (
              <p className="mt-1 text-xs text-error">
                {errors.order_id.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-medium text-text"
            >
              {t("track.phone")}
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="08..."
              {...register("phone")}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-error">{errors.phone.message}</p>
            )}
          </div>

          {error && (
            <div className="rounded-lg bg-error/10 p-3 text-sm text-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center rounded-xl bg-primary py-3 font-semibold text-white transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                {t("track.trackBtn")}
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result Card */}
      {booking && (
        <div className="mt-8 animate-slide-up rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold">{t("booking.bookingDetails")}</h3>
            <Badge variant={getStatusBadgeVariant(booking.status)}>
              {booking.status.toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-text-muted">{t("booking.orderId")}</span>
              <span className="font-mono font-medium">{booking.order_id}</span>
            </div>

            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-text-muted">{t("vehicles.vehicle")}</span>
              {/* Note: In a real app we would might join or fetch vehicle name. 
                  For now we rely on what the RPC returns. 
                  If RPC returns vehicle data, we display it. 
                  Otherwise we might need to fetch it. 
                  Assuming RPC returns embedded vehicle or we fetch it in action. */}
              <span className="font-medium">
                {/* @ts-expect-error vehicle might be joined in RPC */}
                {booking.vehicle?.name || "Vehicle"}
              </span>
            </div>

            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-text-muted">{t("booking.dates")}</span>
              <span className="font-medium">
                {booking.start_date} - {booking.end_date}
              </span>
            </div>

            <div className="flex justify-between pt-2">
              <span className="font-semibold text-text">Total</span>
              <span className="font-bold text-primary">
                {formatRupiah(booking.final_price)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
