"use client";

import { ArrowRight, Bike, Car, Gauge, Settings2, Users } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatRupiah } from "@/lib/format";
import type { Vehicle } from "@/types/database";

interface VehicleCardProps {
  vehicle: Vehicle;
  locale?: string;
}

export function VehicleCard({
  vehicle,
  locale: _locale,
}: Readonly<VehicleCardProps>) {
  const t = useTranslations();

  const isCar = vehicle.type === "car";

  return (
    <Link
      href={`/vehicles/${vehicle.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-primary/50 hover:shadow-glow"
    >
      {/* Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-background">
        {vehicle.image_url ? (
          <Image
            src={vehicle.image_url}
            alt={vehicle.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-muted">
            {isCar ? (
              <Car className="h-12 w-12" />
            ) : (
              <Bike className="h-12 w-12" />
            )}
          </div>
        )}

        {/* Badge */}
        <div className="absolute left-3 top-3">
          <span
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${
              isCar ? "bg-primary/90 text-white" : "bg-secondary/90 text-white"
            }`}
          >
            {isCar ? <Car className="h-3 w-3" /> : <Bike className="h-3 w-3" />}
            {isCar ? t("common.car") : t("common.motorcycle")}
          </span>
        </div>

        {/* Availability */}
        {!vehicle.is_available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded-lg bg-error/90 px-4 py-2 text-sm font-bold text-white">
              {t("vehicles.unavailable")}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-lg font-bold text-text group-hover:text-primary transition-colors">
          {vehicle.name}
        </h3>
        <p className="mb-3 text-xs text-text-muted">
          {vehicle.brand} · {vehicle.model} · {vehicle.year}
        </p>

        {/* Specs Row */}
        <div className="mb-4 flex flex-wrap gap-3 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1">
            <Settings2 className="h-3.5 w-3.5" />
            {vehicle.transmission === "automatic"
              ? t("common.automatic")
              : t("common.manual")}
          </span>
          {vehicle.seats && (
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {vehicle.seats}
            </span>
          )}
          {vehicle.engine_cc && (
            <span className="inline-flex items-center gap-1">
              <Gauge className="h-3.5 w-3.5" />
              {vehicle.engine_cc}cc
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <div>
            <span className="text-lg font-bold text-primary">
              {formatRupiah(vehicle.price_per_day)}
            </span>
            <span className="text-xs text-text-muted">
              {t("common.perDay")}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            {t("vehicles.details")}
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
