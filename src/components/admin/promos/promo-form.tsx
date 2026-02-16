"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  createPromoAction,
  updatePromoAction,
} from "@/app/[locale]/admin/promos/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "@/i18n/navigation";

const promoSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").toUpperCase(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  discount_amount: z.number().min(1000, "Discount must be at least IDR 1.000"),
  min_booking_days: z
    .number()
    .min(1, "Minimum booking days must be at least 1"),
  usage_limit: z.number().min(1, "Usage limit must be at least 1").optional(),
  is_active: z.boolean(),
});

type PromoFormValues = z.infer<typeof promoSchema>;

interface PromoFormProps {
  promo?: {
    id: string;
    code: string;
    description: string | null;
    discount_amount: number;
    min_booking_days: number;
    usage_limit: number | null;
    is_active: boolean;
  };
}

export function PromoForm({ promo }: Readonly<PromoFormProps>) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<PromoFormValues>({
    resolver: zodResolver(promoSchema),
    defaultValues: {
      code: promo?.code || "",
      description: promo?.description || "",
      discount_amount: promo?.discount_amount || 0,
      min_booking_days: promo?.min_booking_days || 1,
      usage_limit: promo?.usage_limit || undefined,
      is_active: promo?.is_active ?? true,
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: PromoFormValues) => {
    setServerError(null);
    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("description", data.description);
    formData.append("discount_amount", String(data.discount_amount));
    formData.append("min_booking_days", String(data.min_booking_days));
    if (data.usage_limit)
      formData.append("usage_limit", String(data.usage_limit));
    if (data.is_active) formData.append("is_active", "on");

    const result = promo
      ? await updatePromoAction(promo.id, null, formData)
      : await createPromoAction(null, formData);

    if (result?.error) {
      setServerError(result.error);
    }
  };

  let submitButtonText = "Create Promo";
  if (isSubmitting) {
    submitButtonText = "Saving...";
  } else if (promo) {
    submitButtonText = "Update Promo";
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="rounded-lg bg-error/10 p-3 text-sm text-error">
          {serverError}
        </div>
      )}

      {/* Inputs omitted for brevity, focusing on fixes */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="code">Promo Code</Label>
          <Input
            id="code"
            {...register("code")}
            placeholder="SUMMER2024"
            className="uppercase"
          />
          {errors.code && (
            <p className="text-xs text-error">{errors.code.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount_amount">Discount Amount (IDR)</Label>
          <Input
            id="discount_amount"
            type="number"
            {...register("discount_amount", { valueAsNumber: true })}
            placeholder="50000"
          />
          {errors.discount_amount && (
            <p className="text-xs text-error">
              {errors.discount_amount.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Discount for summer holidays..."
        />
        {errors.description && (
          <p className="text-xs text-error">{errors.description.message}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="min_booking_days">Min. Booking Days</Label>
          <Input
            id="min_booking_days"
            type="number"
            {...register("min_booking_days", { valueAsNumber: true })}
          />
          {errors.min_booking_days && (
            <p className="text-xs text-error">
              {errors.min_booking_days.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="usage_limit">Usage Limit (Optional)</Label>
          <Input
            id="usage_limit"
            type="number"
            {...register("usage_limit", { valueAsNumber: true })}
            placeholder="100"
          />
          {errors.usage_limit && (
            <p className="text-xs text-error">{errors.usage_limit.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_active"
          checked={watch("is_active")}
          onCheckedChange={(checked: boolean) => setValue("is_active", checked)}
        />
        <Label htmlFor="is_active">Active</Label>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
}
