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
import NextImage from "next/image";
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
      {/* ════════════════════ HERO (PREMIUM CORPORATE) ════════════════════ */}
      <section className="relative overflow-hidden bg-linear-to-br from-white via-blue-50/30 to-white pt-32 pb-16 md:pt-40 md:pb-32 dark:from-background dark:via-primary/5 dark:to-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Left Column: Typography & CTA */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <AnimateOnScroll delay={0} direction="right">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                  </span>{" "}
                  #1 Trusted Rental Service
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.1} direction="right">
                <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-text md:text-5xl lg:text-6xl">
                  {t.heroTitle}
                </h1>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.2} direction="right">
                <p className="mb-8 max-w-xl text-lg text-text-muted md:text-xl leading-relaxed">
                  {t.heroSubtitle}
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll
                delay={0.3}
                direction="right"
                className="flex flex-col gap-4 sm:flex-row w-full sm:w-auto"
              >
                <Link
                  href="/vehicles"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  {t.heroCta}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/vehicles"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white/50 px-8 py-4 text-base font-semibold text-text backdrop-blur-sm transition-all hover:bg-white hover:border-primary/50 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <Search className="h-4 w-4" />
                  {t.heroCtaSecondary}
                </Link>
              </AnimateOnScroll>

              <AnimateOnScroll
                delay={0.4}
                direction="right"
                className="mt-10 flex items-center gap-4 text-sm text-text-muted"
              >
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=128&h=128&fit=crop&q=80",
                  ].map((src, i) => (
                    <div
                      key={src}
                      className="relative flex h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-gray-200 dark:border-background"
                    >
                      <NextImage
                        src={src}
                        alt={`Customer ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary text-xs font-bold text-white dark:border-background">
                    2k+
                  </div>
                </div>
                <div>
                  <div className="flex gap-1 text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <p className="font-medium">Trusted by 2,000+ Customers</p>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Right Column: Visual & Floating Cards */}
            <div className="relative mt-12 lg:mt-0">
              {/* Abstract Background Blotches */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-primary/10 to-transparent opacity-70 blur-3xl" />

              <AnimateOnScroll
                delay={0.2}
                direction="left"
                className="relative z-10"
              >
                {/* Main Vehicle Image - Replace with high-res cutout of Alphard/Fortuner */}
                <div className="relative">
                  <NextImage
                    src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                    alt="Premium Rental Car"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, black 80%, transparent 100%)",
                    }}
                    priority
                  />

                  {/* Floating Glass Card 1: Best Price */}
                  <div className="absolute -left-4 top-10 animate-bounce-slow md:-left-12 md:top-20">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/60 p-4 shadow-xl backdrop-blur-xl dark:bg-black/40 dark:border-white/10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-text-muted">
                          Starts from
                        </p>
                        <p className="text-lg font-bold text-text">
                          {` IDR 300k`}
                          <span className="text-xs font-normal text-text-muted">
                            {" "}
                            /day
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Glass Card 2: Availability */}
                  <div className="absolute -right-4 bottom-10 animate-bounce-slow-delay md:-right-8 md:bottom-20">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/60 p-4 shadow-xl backdrop-blur-xl dark:bg-black/40 dark:border-white/10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-text-muted">
                          Status
                        </p>
                        <p className="text-lg font-bold text-text">
                          Available Now
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
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
              className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-all hover:shadow-lg"
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <NextImage
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80"
                  alt="Car Rental"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white">
                    <Car className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    {carCount} Available
                  </div>
                </div>

                <h3 className="mb-1 text-3xl font-bold text-white">{t.car}</h3>
                <p className="mb-4 text-white/80 line-clamp-1">
                  SUV, MPV, Sedan, Luxury & more
                </p>

                <div className="flex items-center justify-between border-t border-white/20 pt-4">
                  <div>
                    <p className="text-xs text-white/60">{t.carsFrom}</p>
                    {cheapestCar && (
                      <p className="text-lg font-bold text-white">
                        {formatRupiah(cheapestCar)}
                        <span className="text-xs font-normal text-white/60">
                          /{t.perDay}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          </StaggerItem>

          <StaggerItem>
            <Link
              href="/vehicles?type=motorcycle"
              className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-all hover:shadow-lg"
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <NextImage
                  src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80"
                  alt="Motorcycle Rental"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white">
                    <Bike className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    {motorCount} Available
                  </div>
                </div>

                <h3 className="mb-1 text-3xl font-bold text-white">
                  {t.motorcycle}
                </h3>
                <p className="mb-4 text-white/80 line-clamp-1">
                  Matic, Sport, Trail, Classic
                </p>

                <div className="flex items-center justify-between border-t border-white/20 pt-4">
                  <div>
                    <p className="text-xs text-white/60">{t.motorsFrom}</p>
                    {cheapestMotor && (
                      <p className="text-lg font-bold text-white">
                        {formatRupiah(cheapestMotor)}
                        <span className="text-xs font-normal text-white/60">
                          /{t.perDay}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-secondary transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
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
