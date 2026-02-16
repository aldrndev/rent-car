import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { TrackBookingForm } from "@/components/track/track-booking-form";

export async function generateMetadata() {
  const t = await getTranslations("track");
  return {
    title: `${t("title")} | RentaGo`,
  };
}

export default async function TrackPage() {
  const t = await getTranslations("track");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-3xl font-bold">{t("title")}</h1>
          <p className="mb-12 text-text-muted">{t("subtitle")}</p>

          <TrackBookingForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
