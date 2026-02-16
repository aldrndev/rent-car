import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";
import type { Vehicle } from "@/types/database";
import { LandingClient } from "./landing-client";

export default async function HomePage() {
  const supabase = await createClient();
  const t = await getTranslations();

  // Fetch all available vehicles (sorted by price)
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_available", true)
    .order("price_per_day", { ascending: true });

  // Flatten translation keys for the client component
  const strings: Record<string, string> = {
    heroTitle: t("landing.heroTitle"),
    heroSubtitle: t("landing.heroSubtitle"),
    heroCta: t("landing.heroCta"),
    heroCtaSecondary: t("landing.heroCtaSecondary"),
    featuredTitle: t("landing.featuredTitle"),
    featuredSubtitle: t("landing.featuredSubtitle"),
    viewAll: t("landing.viewAll"),
    registerBanner: t("landing.registerBanner"),
    registerBannerCode: t("landing.registerBannerCode"),
    registerCta: t("landing.registerCta"),
    whyUs: t("landing.whyUs"),
    whyUsSubtitle: t("landing.whyUsSubtitle"),
    whyFast: t("landing.whyFast"),
    whyFastDesc: t("landing.whyFastDesc"),
    whyTrusted: t("landing.whyTrusted"),
    whyTrustedDesc: t("landing.whyTrustedDesc"),
    whyDelivery: t("landing.whyDelivery"),
    whyDeliveryDesc: t("landing.whyDeliveryDesc"),
    whyPrice: t("landing.whyPrice"),
    whyPriceDesc: t("landing.whyPriceDesc"),
    statsVehicles: t("landing.statsVehicles"),
    statsCustomers: t("landing.statsCustomers"),
    statsRating: t("landing.statsRating"),
    statsCities: t("landing.statsCities"),
    howItWorks: t("landing.howItWorks"),
    howItWorksSubtitle: t("landing.howItWorksSubtitle"),
    step1Title: t("landing.step1Title"),
    step1Desc: t("landing.step1Desc"),
    step2Title: t("landing.step2Title"),
    step2Desc: t("landing.step2Desc"),
    step3Title: t("landing.step3Title"),
    step3Desc: t("landing.step3Desc"),
    testimonialsTitle: t("landing.testimonialsTitle"),
    testimonialsSubtitle: t("landing.testimonialsSubtitle"),
    ctaTitle: t("landing.ctaTitle"),
    ctaSubtitle: t("landing.ctaSubtitle"),
    carsFrom: t("landing.carsFrom"),
    motorsFrom: t("landing.motorsFrom"),
    car: t("common.car"),
    motorcycle: t("common.motorcycle"),
    perDay: t("common.perDay"),
  };

  return (
    <main className="min-h-screen">
      <LandingClient vehicles={(vehicles ?? []) as Vehicle[]} t={strings} />
      <Footer />
    </main>
  );
}
