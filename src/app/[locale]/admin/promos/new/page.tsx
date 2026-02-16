import { PromoForm } from "@/components/admin/promos/promo-form";

export default function NewPromoPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Promo</h1>
        <p className="text-text-muted">Create a new discount voucher.</p>
      </div>

      <div className="rounded-lg border border-border bg-surface p-6">
        <PromoForm />
      </div>
    </div>
  );
}
