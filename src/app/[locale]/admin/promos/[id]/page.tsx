import { notFound } from "next/navigation";
import { PromoForm } from "@/components/admin/promos/promo-form";
import { createClient } from "@/lib/supabase/server";

interface EditPromoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPromoPage({ params }: EditPromoPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: promo } = await supabase
    .from("promos")
    .select("*")
    .eq("id", id)
    .single();

  if (!promo) {
    notFound();
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Promo</h1>
        <p className="text-text-muted">Update promo details.</p>
      </div>

      <div className="rounded-lg border border-border bg-surface p-6">
        <PromoForm promo={promo} />
      </div>
    </div>
  );
}
