import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { MyBookingList } from "@/components/bookings/my-booking-list";
import { Footer } from "@/components/layout/footer";
import { NavbarClient } from "@/components/layout/navbar-client";
import { createClient } from "@/lib/supabase/server";
import type { Booking, Vehicle } from "@/types/database";

// Define the joined type used in the server component
type BookingWithVehicleJoined = Booking & {
  vehicle: Vehicle;
};

export async function generateMetadata() {
  const t = await getTranslations("common");
  return {
    title: `${t("myBookings")} | RentaGo`,
  };
}

export default async function MyBookingsPage() {
  const t = await getTranslations("common");
  const supabase = await createClient();

  // 1. Check Auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/my-bookings");
  }

  // 2. Fetch User Profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const userProfile = profile
    ? {
        email: user.email ?? "",
        fullName: profile.full_name,
        role: profile.role,
      }
    : null;

  // 3. Fetch Bookings
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, vehicle:vehicles(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<BookingWithVehicleJoined[]>();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavbarClient user={userProfile} />

      <main className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-2 text-3xl font-bold">{t("myBookings")}</h1>
          <p className="mb-8 text-text-muted">
            Manage your trips and transactions.
          </p>

          <MyBookingList bookings={bookings || []} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
