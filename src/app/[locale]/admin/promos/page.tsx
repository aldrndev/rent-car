import { PromoTable } from "@/components/admin/promos/promo-table";
import { createClient } from "@/lib/supabase/server";

interface AdminPromosPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminPromosPage({
  searchParams,
}: AdminPromosPageProps) {
  const supabase = await createClient();
  const PAGE_SIZE = 10;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  // Calculate range for pagination
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: promos, count } = await supabase
    .from("promos")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Promos</h1>
        <p className="text-text-muted">Manage discount codes and vouchers.</p>
      </div>

      <PromoTable
        promos={promos || []}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
