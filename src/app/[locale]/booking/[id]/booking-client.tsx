"use client";

import type { User } from "@supabase/supabase-js";
import { differenceInDays, format } from "date-fns";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { createBookingAction } from "@/app/[locale]/booking/actions";
import { Link, useRouter } from "@/i18n/navigation";
import { formatRupiah } from "@/lib/format";
import type { Vehicle } from "@/types/database";

interface BookingClientProps {
  vehicle: Vehicle;
  user: User | null;
}

interface SnapResult {
  order_id: string;
  transaction_status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: unknown; // Snap result can have improved types but this is external
}

interface BookingFormData {
  start_date: string;
  end_date: string;
  pickup_location: string;
  delivery_location: string;
  notes: string;
  promo_code: string;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  vehicle_id: string;
}

export function BookingClient({ vehicle, user }: BookingClientProps) {
  const t = useTranslations();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // snapToken state is effectively unused because we use it immediately in globalThis.snap.pay
  // We don't need to store it in React state

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      start_date: "",
      end_date: "",
      pickup_location: "",
      delivery_location: "",
      notes: "",
      promo_code: "",
      guest_name: user?.user_metadata?.full_name || "",
      guest_phone: user?.user_metadata?.phone || "",
      guest_email: user?.email || "",
      vehicle_id: vehicle.id,
    },
  });

  const startDate = watch("start_date");
  const endDate = watch("end_date");
  const promoCode = watch("promo_code");

  // Calculate totals
  let totalDays = 0;
  let totalPrice = 0;
  let discount = 0;
  let finalPrice = 0;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    totalDays = differenceInDays(end, start) + 1;
    if (totalDays > 0) {
      totalPrice = totalDays * vehicle.price_per_day;
      if (promoCode === "WELCOME50K") discount = 50000;
      finalPrice = Math.max(0, totalPrice - discount);
    }
  }

  const onSubmit: SubmitHandler<BookingFormData> = (data) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value as string);
      });

      const result = await createBookingAction(null, formData);

      if (result?.error) {
        alert(result.error);
        return;
      }

      if (result?.token) {
        // Open Snap Popup
        // @ts-expect-error Snap is loaded via script
        globalThis.snap.pay(result.token, {
          onSuccess: (result: SnapResult) => {
            router.push(`/booking/success?order_id=${result.order_id}`);
          },
          onPending: (result: SnapResult) => {
            router.push(`/booking/success?order_id=${result.order_id}`);
          },
          onError: (_result: SnapResult) => {
            alert(t("booking.paymentFailed"));
          },
          onClose: () => {
            alert(t("booking.paymentClosed"));
          },
        });
      }
    });
  };

  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <main className="min-h-screen bg-background pb-20 pt-8">
        <div className="mx-auto max-w-6xl px-4">
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("common.back")}
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* FORM */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <h1 className="mb-6 text-2xl font-bold">
                  {t("booking.title")}
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Dates */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="start_date"
                        className="mb-2 block text-sm font-medium"
                      >
                        {t("booking.startDate")}
                      </label>
                      <input
                        id="start_date"
                        type="date"
                        {...register("start_date", { required: true })}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        min={format(new Date(), "yyyy-MM-dd")}
                      />
                      {errors.start_date && (
                        <p className="mt-1 text-xs text-error">
                          {t("booking.required")}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="end_date"
                        className="mb-2 block text-sm font-medium"
                      >
                        {t("booking.endDate")}
                      </label>
                      <input
                        id="end_date"
                        type="date"
                        {...register("end_date", { required: true })}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        min={startDate || format(new Date(), "yyyy-MM-dd")}
                      />
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="pickup_location"
                        className="mb-2 block text-sm font-medium"
                      >
                        {t("booking.pickupLocation")}
                      </label>
                      <input
                        id="pickup_location"
                        type="text"
                        placeholder={t("booking.pickupLocation")}
                        {...register("pickup_location")}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="delivery_location"
                        className="mb-2 block text-sm font-medium"
                      >
                        {t("booking.deliveryLocation")}
                      </label>
                      <input
                        id="delivery_location"
                        type="text"
                        placeholder={t("common.optional")}
                        {...register("delivery_location")}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Guest Details (only if no user) */}
                  {!user && (
                    <div className="space-y-4 rounded-xl bg-background/50 p-4">
                      <h3 className="font-semibold">
                        {t("booking.bookAsGuest")}
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="guest_name" className="sr-only">
                            {t("booking.guestName")}
                          </label>
                          <input
                            id="guest_name"
                            type="text"
                            placeholder={t("booking.guestName")}
                            {...register("guest_name", { required: true })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="guest_email" className="sr-only">
                            {t("booking.guestEmail")}
                          </label>
                          <input
                            id="guest_email"
                            type="email"
                            placeholder={t("booking.guestEmail")}
                            {...register("guest_email", { required: true })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="guest_phone" className="sr-only">
                            {t("booking.guestPhone")}
                          </label>
                          <input
                            id="guest_phone"
                            type="tel"
                            placeholder={t("booking.guestPhone")}
                            {...register("guest_phone", { required: true })}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <label
                      htmlFor="notes"
                      className="mb-2 block text-sm font-medium"
                    >
                      {t("booking.notes")}
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      {...register("notes")}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Promo */}
                  <div>
                    <label
                      htmlFor="promo_code"
                      className="mb-2 block text-sm font-medium"
                    >
                      {t("booking.promoCode")}
                    </label>
                    <input
                      id="promo_code"
                      type="text"
                      {...register("promo_code")}
                      placeholder="WELCOME50K"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    {promoCode === "WELCOME50K" && (
                      <p className="mt-1 text-xs text-green-500">
                        {t("booking.promoApplied")}
                      </p>
                    )}
                  </div>

                  {/* Hidden vehicle_id */}
                  <input type="hidden" {...register("vehicle_id")} />

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isPending || totalDays < 1}
                      className="flex w-full items-center justify-center rounded-xl bg-primary py-4 font-bold text-white transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      {isPending ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        t("booking.payNowWithPrice", {
                          price: formatRupiah(finalPrice),
                        })
                      )}
                    </button>
                    <p className="mt-4 text-center text-xs text-text-muted">
                      {t("booking.securedByMidtrans")}
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* SUMMARY (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold">
                  {t("booking.summary")}
                </h2>

                {/* Vehicle Mini */}
                <div className="mb-6 flex gap-4">
                  {vehicle.image_url && (
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-background">
                      <Image
                        src={vehicle.image_url}
                        alt={vehicle.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold">{vehicle.name}</h3>
                    <p className="text-sm text-text-muted">{vehicle.brand}</p>
                    <p className="text-sm font-medium text-primary">
                      {formatRupiah(vehicle.price_per_day)}/{t("common.days")}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">
                      {t("booking.totalDays")}
                    </span>
                    <span className="font-medium">
                      {totalDays > 0 ? `${totalDays} ${t("common.days")}` : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">
                      {t("booking.totalPrice")}
                    </span>
                    <span className="font-medium">
                      {formatRupiah(totalPrice)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>{t("booking.promoDiscount")}</span>
                      <span>- {formatRupiah(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
                    <span>{t("booking.finalPrice")}</span>
                    <span>{formatRupiah(finalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
