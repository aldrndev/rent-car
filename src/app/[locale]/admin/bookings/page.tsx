import { AdminBookingTable } from "@/components/admin/bookings/booking-table";
import { createClient } from "@/lib/supabase/server";

export default async function AdminBookingsPage() {
  const supabase = await createClient();

  // Fetch bookings with related data
  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      *,
      vehicle:vehicles(name, image_url),
      user:profiles(full_name, email)
    `)
    .order("created_at", { ascending: false });

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

      <AdminBookingTable bookings={formattedBookings} />
    </div>
  );
}
