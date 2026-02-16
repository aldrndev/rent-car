import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";

interface Props {
  searchParams: Promise<{ order_id: string }>;
}

export default async function BookingSuccessPage({ searchParams }: Props) {
  const { order_id } = await searchParams;
  const t = await getTranslations();
  const supabase = await createClient();

  // Verify order exists
  const { data: booking } = await supabase
    .from("bookings")
    .select("*, vehicles(name, brand, image_url)")
    .eq("order_id", order_id)
    .single();

  if (!booking) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-error">
          {t("booking.orderNotFound")}
        </h1>
        <p>{t("booking.checkOrderId")}</p>
        <Link
          href="/"
          className="rounded-xl bg-primary px-6 py-3 font-bold text-white"
        >
          {t("common.backToHome")}
        </Link>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-20">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <h1 className="mb-2 text-3xl font-bold">{t("booking.success")}</h1>
        <p className="mb-8 text-text-muted">{t("booking.successMessage")}</p>
        <p className="mb-8 font-mono font-bold text-text">{order_id}</p>

        <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-sm">
          {booking.vehicles && (
            <div className="flex gap-4 border-b border-border p-4">
              {booking.vehicles.image_url && (
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-background">
                  <Image
                    src={booking.vehicles.image_url}
                    alt="Vehicle"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                {/* @ts-ignore */}
                <h3 className="font-bold">{booking.vehicles.name}</h3>
                {/* @ts-ignore */}
                <p className="text-xs text-text-muted">
                  {booking.vehicles.brand}
                </p>
              </div>
            </div>
          )}
          <div className="bg-surface p-4 text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-text-muted">{t("booking.finalPrice")}</span>
              <span className="font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(booking.final_price)}
              </span>
            </div>
            <div className="mt-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
              {t("booking.completePaymentInstruction")}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/my-bookings"
            className="flex w-full items-center justify-center rounded-xl bg-primary py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t("booking.viewMyBookings")}
          </Link>
          <Link
            href="/"
            className="flex w-full items-center justify-center rounded-xl border border-border bg-surface py-3 font-semibold text-text hover:bg-surface-hover"
          >
            {t("common.backToHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}
