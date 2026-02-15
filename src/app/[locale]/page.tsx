import { ArrowRight, Bike, Car, Shield, Star, Truck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-primary">
            {t("common.appName")}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/vehicles"
              className="text-sm text-text-muted transition-colors hover:text-text"
            >
              {t("common.vehicles")}
            </Link>
            <Link
              href="/track"
              className="text-sm text-text-muted transition-colors hover:text-text"
            >
              {t("common.trackBooking")}
            </Link>
            <Link
              href="/auth/login"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              {t("common.login")}
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-surface to-background px-4 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_50%)] opacity-10" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Star className="h-4 w-4" />
            <span>#1 Rental Kendaraan</span>
          </div>
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
            {t("landing.heroTitle")}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-text-muted md:text-xl">
            {t("landing.heroSubtitle")}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/vehicles"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-glow transition-all hover:bg-primary-hover hover:shadow-glow-lg"
            >
              {t("landing.heroCta")}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-8 py-3.5 text-base font-semibold text-text transition-colors hover:border-primary/50 hover:bg-surface-hover"
            >
              {t("landing.registerCta")}
            </Link>
          </div>
        </div>
      </section>

      {/* Vehicle Type Cards */}
      <section className="border-y border-border bg-surface/50 px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Link
            href="/vehicles?type=car"
            className="group flex items-center gap-6 rounded-2xl border border-border bg-surface p-6 transition-all hover:border-primary/50 hover:shadow-glow"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Car className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{t("common.car")}</h3>
              <p className="text-text-muted">SUV, MPV, Sedan & more</p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
          <Link
            href="/vehicles?type=motorcycle"
            className="group flex items-center gap-6 rounded-2xl border border-border bg-surface p-6 transition-all hover:border-secondary/50 hover:shadow-glow"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform group-hover:scale-110">
              <Bike className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{t("common.motorcycle")}</h3>
              <p className="text-text-muted">Matic, Sport, Trail</p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-secondary" />
          </Link>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-center text-white md:p-12">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            {t("landing.registerBanner")}
          </h2>
          <Link
            href="/auth/register"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary transition-transform hover:scale-105"
          >
            {t("landing.registerCta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Why Us */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold">
            {t("landing.whyUs")}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: t("landing.whyFast"),
                desc: t("landing.whyFastDesc"),
                color: "text-yellow-400 bg-yellow-400/10",
              },
              {
                icon: Shield,
                title: t("landing.whyTrusted"),
                desc: t("landing.whyTrustedDesc"),
                color: "text-green-400 bg-green-400/10",
              },
              {
                icon: Truck,
                title: t("landing.whyDelivery"),
                desc: t("landing.whyDeliveryDesc"),
                color: "text-blue-400 bg-blue-400/10",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-surface p-8 text-center transition-all hover:border-border-hover hover:shadow-glow"
              >
                <div
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{title}</h3>
                <p className="text-text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface px-4 py-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-text-muted">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-primary">RentaGo</span>. All
            rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
