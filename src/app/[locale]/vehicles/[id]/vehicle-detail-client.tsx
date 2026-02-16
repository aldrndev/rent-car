"use client";

import type { User } from "@supabase/supabase-js";
import {
  ArrowLeft,
  Bike,
  Calendar,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Settings2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BookingAuthModal } from "@/components/bookings/booking-auth-modal";
import { Footer } from "@/components/layout/footer";
import { Link, useRouter } from "@/i18n/navigation";
import { formatRupiah } from "@/lib/format";
import type { Vehicle } from "@/types/database";

interface Props {
  vehicle: Vehicle;
  user: User | null;
}

export function VehicleDetailClient({ vehicle, user }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isCar = vehicle.type === "car";
  const allImages = [
    ...new Set([vehicle.image_url, ...(vehicle.images ?? [])].filter(Boolean)),
  ] as string[];

  const features = Array.isArray(vehicle.features)
    ? (vehicle.features as string[])
    : [];

  const handleBookClick = () => {
    if (user) {
      router.push(`/booking/${vehicle.id}`);
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Auth Modal */}
      <BookingAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onGuest={() => router.push(`/booking/${vehicle.id}`)}
        loginUrl={`/auth/login?next=/booking/${vehicle.id}`}
      />

      {/* Breadcrumb */}
      <section className="border-b border-border bg-surface/50 px-4 py-4">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("common.back")}
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-5">
          {/* Image Gallery — 3 cols */}
          <div className="lg:col-span-3">
            {/* Main Image */}
            <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-border bg-surface">
              {allImages.length > 0 ? (
                <Image
                  src={allImages[currentImage]}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-text-muted">
                  {isCar ? (
                    <Car className="h-20 w-20" />
                  ) : (
                    <Bike className="h-20 w-20" />
                  )}
                </div>
              )}

              {/* Navigation arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImage(
                        (prev) =>
                          (prev - 1 + allImages.length) % allImages.length,
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImage((prev) => (prev + 1) % allImages.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Badge */}
              <div className="absolute left-4 top-4">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                    isCar
                      ? "bg-primary/90 text-white"
                      : "bg-secondary/90 text-white"
                  }`}
                >
                  {isCar ? (
                    <Car className="h-3.5 w-3.5" />
                  ) : (
                    <Bike className="h-3.5 w-3.5" />
                  )}
                  {isCar ? t("common.car") : t("common.motorcycle")}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {allImages.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setCurrentImage(i)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                      currentImage === i
                        ? "border-primary"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${vehicle.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details — 2 cols */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-surface p-6">
              {/* Title */}
              <h1 className="mb-1 text-2xl font-bold">{vehicle.name}</h1>
              <p className="mb-6 text-sm text-text-muted">
                {vehicle.brand} · {vehicle.model} · {vehicle.year}
              </p>

              {/* Price */}
              <div className="mb-6 rounded-xl bg-primary/10 p-4">
                <p className="text-sm text-text-muted">
                  {t("common.perDay").replace("/", "")}
                </p>
                <p className="text-3xl font-bold text-primary">
                  {formatRupiah(vehicle.price_per_day)}
                </p>
              </div>

              {/* Specs */}
              <div className="mb-6">
                <h2 className="mb-3 text-sm font-semibold text-text-muted">
                  {t("vehicles.specs")}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 rounded-lg border border-border p-3">
                    <Settings2 className="h-4 w-4 text-text-muted" />
                    <div>
                      <p className="text-xs text-text-muted">
                        {t("vehicles.filterTransmission")}
                      </p>
                      <p className="text-sm font-medium">
                        {vehicle.transmission === "automatic"
                          ? t("common.automatic")
                          : t("common.manual")}
                      </p>
                    </div>
                  </div>
                  {vehicle.seats && (
                    <div className="flex items-center gap-2 rounded-lg border border-border p-3">
                      <Users className="h-4 w-4 text-text-muted" />
                      <div>
                        <p className="text-xs text-text-muted">
                          {t("vehicles.seats")}
                        </p>
                        <p className="text-sm font-medium">{vehicle.seats}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.engine_cc && (
                    <div className="flex items-center gap-2 rounded-lg border border-border p-3">
                      <Gauge className="h-4 w-4 text-text-muted" />
                      <div>
                        <p className="text-xs text-text-muted">
                          {t("vehicles.engineCc")}
                        </p>
                        <p className="text-sm font-medium">
                          {vehicle.engine_cc}cc
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 rounded-lg border border-border p-3">
                    <Calendar className="h-4 w-4 text-text-muted" />
                    <div>
                      <p className="text-xs text-text-muted">
                        {t("vehicles.year")}
                      </p>
                      <p className="text-sm font-medium">{vehicle.year}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div className="mb-6">
                  <h2 className="mb-3 text-sm font-semibold text-text-muted">
                    {t("vehicles.features")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs"
                      >
                        <Check className="h-3 w-3 text-green-400" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {vehicle.description && (
                <div className="mb-6">
                  <p className="text-sm leading-relaxed text-text-muted">
                    {vehicle.description}
                  </p>
                </div>
              )}

              {/* CTA */}
              {vehicle.is_available ? (
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="block w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  {t("booking.title")}
                </button>
              ) : (
                <div className="rounded-xl bg-error/10 py-3 text-center text-sm font-semibold text-error">
                  {t("vehicles.unavailable")}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
