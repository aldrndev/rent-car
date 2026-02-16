import { AdminBookingTable } from "@/components/admin/bookings/booking-table";
import { createClient } from "@/lib/supabase/server";

interface AdminBookingsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminBookingsPage({
  searchParams,
}: AdminBookingsPageProps) {
  const supabase = await createClient();
  const PAGE_SIZE = 10;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  // Calculate range for pagination
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  // Fetch bookings with related data
  const { data: bookings, count } = await supabase
    .from("bookings")
    .select(
      `
      *,
      vehicle:vehicles(name, image_url),
      user:profiles(full_name, email)
    `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;

  // Transform data to match component interface
  const formattedBookings =
    bookings?.map((booking) => ({
      ...booking,
      vehicle: Array.isArray(booking.vehicle)
        ? booking.vehicle[0]
        : booking.vehicle,
      user: Array.isArray(booking.user) ? booking.user[0] : booking.user,
    })) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-text-muted">Manage all reservations.</p>
        </div>
      </div>

      <AdminBookingTable
        bookings={formattedBookings}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
