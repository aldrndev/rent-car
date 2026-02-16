import {
  CreditCard,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { formatRupiah } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch stats concurrently
  const [
    { count: bookingsCount },
    { count: usersCount },
    { count: vehiclesCount },
    { data: revenueData },
  ] = await Promise.all([
    supabase.from("bookings").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("vehicles").select("*", { count: "exact", head: true }),
    supabase
      .from("payments")
      .select("amount")
      .eq("status", "settlement"), // Assuming 'settlement' means paid
  ]);

  const totalRevenue =
    revenueData?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

  const stats = [
    {
      label: "Total Revenue",
      value: formatRupiah(totalRevenue),
      icon: DollarSign,
      trend: "+12.5%", // Mock trend
      trendUp: true,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Total Bookings",
      value: bookingsCount || 0,
      icon: CreditCard,
      trend: "+4.3%",
      trendUp: true,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Total Users",
      value: usersCount || 0,
      icon: Users,
      trend: "+2.1%",
      trendUp: true,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Vehicles",
      value: vehiclesCount || 0,
      icon: TrendingUp, // Just an icon
      trend: "0%",
      trendUp: true,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-text-muted">
          Overview of your rental business performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-xl p-3 ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trendUp ? "text-success" : "text-error"
                }`}
              >
                {stat.trendUp ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-text-muted">
                {stat.label}
              </h3>
              <p className="mt-1 text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings Placeholder */}
      <div className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="mb-4 text-lg font-bold">Recent Bookings</h2>
        <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border bg-background/50 text-text-muted">
          Recent bookings table will be implemented in the next step.
        </div>
      </div>
    </div>
  );
}
