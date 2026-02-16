"use client";

import {
  ArrowRight,
  Bike,
  Car,
  CheckCircle2,
  CreditCard,
  MapPin,
  Search,
  Shield,
  Star,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import {
  AnimateOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animate";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { Link } from "@/i18n/navigation";
import { formatRupiah } from "@/lib/format";
import type { Vehicle } from "@/types/database";

interface LandingClientProps {
  vehicles: Vehicle[];
  t: Record<string, string>;
}

export function LandingClient({ vehicles, t }: LandingClientProps) {
  const featuredCars = vehicles.filter((v) => v.type === "car").slice(0, 4);
  const featuredMotors = vehicles
    .filter((v) => v.type === "motorcycle")
    .slice(0, 4);
  const featured = [...featuredCars.slice(0, 3), ...featuredMotors.slice(0, 3)];

  const carCount = vehicles.filter((v) => v.type === "car").length;
  const motorCount = vehicles.filter((v) => v.type === "motorcycle").length;
  const cheapestCar = featuredCars[0]?.price_per_day;
  const cheapestMotor = featuredMotors[0]?.price_per_day;

  return (
    <>
      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative overflow-hidden bg-linear-to-br from-background via-surface to-background px-4 pb-20 pt-24 md:pb-28 md:pt-32">
        {/* Radial glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary)_0%,transparent_50%)] opacity-10" />
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Trust badge */}
          <AnimateOnScroll delay={0} direction="none">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Star className="h-4 w-4 fill-current" />
              <span>4.9/5 — 2000+ Reviews</span>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} direction="up">
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {t.heroTitle}
            </h1>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2} direction="up">
            <p className="mx-auto mb-10 max-w-2xl text-lg text-text-muted md:text-xl">
              {t.heroSubtitle}
            </p>
          </AnimateOnScroll>

          {/* Hero CTAs */}
          <AnimateOnScroll delay={0.3} direction="up">
            <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/vehicles"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-glow transition-all hover:bg-primary-hover hover:shadow-glow-lg"
              >
                {t.heroCta}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/vehicles"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-8 py-4 text-base font-semibold text-text transition-colors hover:border-primary/50 hover:bg-surface-hover"
              >
                <Search className="h-4 w-4" />
                {t.heroCtaSecondary}
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Price teasers */}
          <AnimateOnScroll delay={0.4} direction="up">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-text-muted">
              {cheapestMotor && (
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2">
                  <Bike className="h-4 w-4 text-secondary" />
                  {t.motorsFrom}{" "}
                  <strong className="text-text">
                    {formatRupiah(cheapestMotor)}
                  </strong>
                  {t.perDay}
                </span>
              )}
              {cheapestCar && (
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2">
                  <Car className="h-4 w-4 text-primary" />
                  {t.carsFrom}{" "}
                  <strong className="text-text">
                    {formatRupiah(cheapestCar)}
                  </strong>
                  {t.perDay}
                </span>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ════════════════════ STATS BAR ════════════════════ */}
      <section className="border-y border-border bg-surface/60 px-4 py-8 backdrop-blur-xl">
        <StaggerContainer className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            {
              value: `${vehicles.length}+`,
              label: t.statsVehicles,
              icon: Car,
              color: "text-primary",
            },
            {
              value: "2,000+",
              label: t.statsCustomers,
              icon: Users,
              color: "text-green-400",
            },
            {
              value: "4.9/5",
              label: t.statsRating,
              icon: Star,
              color: "text-yellow-400",
            },
            {
              value: "5+",
              label: t.statsCities,
              icon: MapPin,
              color: "text-blue-400",
            },
          ].map(({ value, label, icon: Icon, color }) => (
            <StaggerItem key={label} className="text-center">
              <Icon className={`mx-auto mb-2 h-6 w-6 ${color}`} />
              <p className="text-2xl font-extrabold md:text-3xl">{value}</p>
              <p className="text-xs text-text-muted md:text-sm">{label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ════════════════════ VEHICLE TYPE CARDS ════════════════════ */}
      <section className="px-4 py-16">
        <StaggerContainer className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <StaggerItem>
            <Link
              href="/vehicles?type=car"
              className="group flex flex-col rounded-2xl border border-border bg-surface p-8 transition-all hover:border-primary/50 hover:shadow-glow"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="mb-1 text-2xl font-bold">
                {t.car} ({carCount})
              </h3>
              <p className="mb-4 text-text-muted">SUV, MPV, Sedan & more</p>
              {cheapestCar && (
                <p className="text-sm text-text-muted">
                  {t.carsFrom}{" "}
                  <span className="font-bold text-primary">
                    {formatRupiah(cheapestCar)}
                  </span>
                  {t.perDay}
                </p>
              )}
            </Link>
          </StaggerItem>

          <StaggerItem>
            <Link
              href="/vehicles?type=motorcycle"
              className="group flex flex-col rounded-2xl border border-border bg-surface p-8 transition-all hover:border-secondary/50 hover:shadow-glow"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform group-hover:scale-110">
                <Bike className="h-8 w-8" />
              </div>
              <h3 className="mb-1 text-2xl font-bold">
                {t.motorcycle} ({motorCount})
              </h3>
              <p className="mb-4 text-text-muted">Matic, Sport, Trail</p>
              {cheapestMotor && (
                <p className="text-sm text-text-muted">
                  {t.motorsFrom}{" "}
                  <span className="font-bold text-secondary">
                    {formatRupiah(cheapestMotor)}
                  </span>
                  {t.perDay}
                </p>
              )}
            </Link>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ════════════════════ FEATURED VEHICLES ════════════════════ */}
      <section className="border-y border-border bg-surface/30 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <AnimateOnScroll>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold">{t.featuredTitle}</h2>
                <p className="mt-1 text-text-muted">{t.featuredSubtitle}</p>
              </div>
              <Link
                href="/vehicles"
                className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline sm:inline-flex"
              >
                {t.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateOnScroll>

          <StaggerContainer
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.12}
          >
            {featured.map((vehicle) => (
              <StaggerItem key={vehicle.id}>
                <VehicleCard vehicle={vehicle} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateOnScroll className="mt-8 text-center sm:hidden">
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              {t.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimateOnScroll className="mb-14 text-center">
            <h2 className="text-3xl font-bold">{t.howItWorks}</h2>
            <p className="mt-2 text-text-muted">{t.howItWorksSubtitle}</p>
          </AnimateOnScroll>

          <StaggerContainer
            className="grid gap-8 md:grid-cols-3"
            staggerDelay={0.15}
          >
            {[
              {
                step: "01",
                icon: Search,
                title: t.step1Title,
                desc: t.step1Desc,
                color: "bg-primary/10 text-primary",
              },
              {
                step: "02",
                icon: CreditCard,
                title: t.step2Title,
                desc: t.step2Desc,
                color: "bg-secondary/10 text-secondary",
              },
              {
                step: "03",
                icon: Truck,
                title: t.step3Title,
                desc: t.step3Desc,
                color: "bg-green-400/10 text-green-400",
              },
            ].map(({ step, icon: Icon, title, desc, color }) => (
              <StaggerItem key={step}>
                <div className="group relative rounded-2xl border border-border bg-surface p-8 transition-all hover:border-border-hover hover:shadow-glow">
                  <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-xs font-bold text-text-muted shadow-lg ring-1 ring-border">
                    {step}
                  </div>
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{title}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════ PROMO BANNER ════════════════════ */}
      <AnimateOnScroll direction="none" className="px-4 py-4">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-linear-to-r from-primary via-primary to-secondary p-8 text-white md:p-12">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div className="flex-1">
              <h2 className="mb-2 text-2xl font-bold md:text-3xl">
                {t.registerBanner}
              </h2>
              <p className="text-sm text-white/80">{t.registerBannerCode}</p>
            </div>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-bold text-primary shadow-lg transition-transform hover:scale-105"
            >
              {t.registerCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </AnimateOnScroll>

      {/* ════════════════════ WHY US ════════════════════ */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimateOnScroll className="mb-14 text-center">
            <h2 className="text-3xl font-bold">{t.whyUs}</h2>
            <p className="mt-2 text-text-muted">{t.whyUsSubtitle}</p>
          </AnimateOnScroll>

          <StaggerContainer
            className="grid gap-6 sm:grid-cols-2"
            staggerDelay={0.1}
          >
            {[
              {
                icon: Zap,
                title: t.whyFast,
                desc: t.whyFastDesc,
                color: "text-yellow-400 bg-yellow-400/10",
              },
              {
                icon: Shield,
                title: t.whyTrusted,
                desc: t.whyTrustedDesc,
                color: "text-green-400 bg-green-400/10",
              },
              {
                icon: Truck,
                title: t.whyDelivery,
                desc: t.whyDeliveryDesc,
                color: "text-blue-400 bg-blue-400/10",
              },
              {
                icon: CheckCircle2,
                title: t.whyPrice,
                desc: t.whyPriceDesc,
                color: "text-purple-400 bg-purple-400/10",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <StaggerItem key={title}>
                <div className="flex gap-5 rounded-2xl border border-border bg-surface p-6 transition-all hover:border-border-hover hover:shadow-glow">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${color}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">{title}</h3>
                    <p className="text-sm leading-relaxed text-text-muted">
                      {desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════ TESTIMONIALS ════════════════════ */}
      <section className="border-y border-border bg-surface/30 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimateOnScroll className="mb-14 text-center">
            <h2 className="text-3xl font-bold">{t.testimonialsTitle}</h2>
            <p className="mt-2 text-text-muted">{t.testimonialsSubtitle}</p>
          </AnimateOnScroll>

          <StaggerContainer
            className="grid gap-6 md:grid-cols-3"
            staggerDelay={0.12}
          >
            {[
              {
                name: "Budi Santoso",
                role: "Jakarta",
                text: "Proses booking cepat banget, kendaraan bersih dan terawat. Sudah 5x sewa di RentaGo!",
                rating: 5,
              },
              {
                name: "Sarah Putri",
                role: "Bandung",
                text: "Sewa motor untuk liburan weekend. Diantar ke hotel, dikembalikan juga dijemput. Super convenient!",
                rating: 5,
              },
              {
                name: "Ahmad Fauzi",
                role: "Surabaya",
                text: "Harga paling kompetitif dibanding rental lain. Kode promo WELCOME50K benar-benar works!",
                rating: 5,
              },
            ].map(({ name, role, text, rating }) => (
              <StaggerItem key={name}>
                <div className="rounded-2xl border border-border bg-surface p-6 transition-all hover:shadow-glow">
                  <div className="mb-4 flex gap-0.5">
                    {[1, 2, 3, 4, 5].slice(0, rating).map((starId) => (
                      <Star
                        key={`${name}-star-${starId}`}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-text-muted">
                    &ldquo;{text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="text-xs text-text-muted">{role}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════ FINAL CTA ════════════════════ */}
      <section className="px-4 py-20">
        <AnimateOnScroll className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t.ctaTitle}</h2>
          <p className="mb-8 text-lg text-text-muted">{t.ctaSubtitle}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/vehicles"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-4 text-base font-bold text-white shadow-glow transition-all hover:bg-primary-hover hover:shadow-glow-lg"
            >
              {t.heroCta}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-8 py-4 text-base font-semibold text-text transition-colors hover:border-primary/50"
            >
              {t.registerCta}
            </Link>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
