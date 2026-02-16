"use client";

import { Bike, Car, Search, SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Footer } from "@/components/layout/footer";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import type { Vehicle } from "@/types/database";

interface Props {
  vehicles: Vehicle[];
}

export function VehicleListClient({ vehicles }: Props) {
  const t = useTranslations();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "car" | "motorcycle">(
    "all",
  );
  const [transmissionFilter, setTransmissionFilter] = useState<
    "all" | "manual" | "automatic"
  >("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const matchSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.brand.toLowerCase().includes(search.toLowerCase()) ||
        v.model.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || v.type === typeFilter;
      const matchTrans =
        transmissionFilter === "all" || v.transmission === transmissionFilter;
      return matchSearch && matchType && matchTrans;
    });
  }, [vehicles, search, typeFilter, transmissionFilter]);

  const hasActiveFilter =
    typeFilter !== "all" || transmissionFilter !== "all" || search !== "";

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-surface/50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-3xl font-bold">{t("vehicles.title")}</h1>
          <p className="text-text-muted">
            {vehicles.length} {t("common.vehicles").toLowerCase()}
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-16 z-30 border-b border-border bg-surface/80 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`${t("common.search")}...`}
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm transition-colors placeholder:text-text-muted/50 focus:border-primary focus:outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Type Buttons */}
          <div className="flex gap-2">
            {[
              { value: "all" as const, label: t("common.all"), icon: null },
              { value: "car" as const, label: t("common.car"), icon: Car },
              {
                value: "motorcycle" as const,
                label: t("common.motorcycle"),
                icon: Bike,
              },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTypeFilter(value)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                  typeFilter === value
                    ? "bg-primary text-white"
                    : "border border-border bg-background text-text-muted hover:border-primary/50 hover:text-text"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {label}
              </button>
            ))}
          </div>

          {/* Filter Toggle */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
              showFilters
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background text-text-muted hover:text-text"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t("common.filter")}
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mx-auto mt-4 max-w-7xl animate-slide-down">
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="flex flex-wrap gap-6">
                {/* Transmission */}
                <div>
                  <p className="mb-2 text-xs font-medium text-text-muted">
                    {t("vehicles.filterTransmission")}
                  </p>
                  <div className="flex gap-2">
                    {(
                      [
                        { value: "all", label: t("common.all") },
                        { value: "automatic", label: t("common.automatic") },
                        { value: "manual", label: t("common.manual") },
                      ] as const
                    ).map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setTransmissionFilter(value)}
                        className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${
                          transmissionFilter === value
                            ? "bg-primary text-white"
                            : "border border-border text-text-muted hover:text-text"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Results */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Active filter info */}
          {hasActiveFilter && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-text-muted">
                {filtered.length} {t("common.vehicles").toLowerCase()}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setTypeFilter("all");
                  setTransmissionFilter("all");
                }}
                className="text-xs text-primary hover:underline"
              >
                Reset
              </button>
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Car className="mx-auto mb-4 h-12 w-12 text-text-muted/50" />
              <p className="text-lg font-medium text-text-muted">
                {t("vehicles.noResults")}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
