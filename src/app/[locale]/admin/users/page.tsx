import { UserTable } from "@/components/admin/users/user-table";
import { createClient } from "@/lib/supabase/server";

interface AdminUsersPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const supabase = await createClient();
  const PAGE_SIZE = 10;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  // Calculate range for pagination
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: users, count } = await supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-text-muted">Manage registered users and roles.</p>
      </div>

      <UserTable
        users={users || []}
        currentPage={currentPage}
        totalPages={totalPages}
        totalUsers={count || 0}
      />
    </div>
  );
}
