"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const promoSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").toUpperCase(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  discount_amount: z.number().min(1000, "Discount must be at least IDR 1.000"),
  min_booking_days: z
    .number()
    .min(1, "Minimum booking days must be at least 1"),
  usage_limit: z.number().min(1, "Usage limit must be at least 1").optional(),
  is_active: z.boolean().default(true),
});

export async function createPromoAction(
  _prevState: unknown,
  formData: FormData,
) {
  const supabase = await createClient();

  // 1. Validate Input
  const data = {
    code: formData.get("code") as string,
    description: formData.get("description") as string,
    discount_amount: Number(formData.get("discount_amount")),
    min_booking_days: Number(formData.get("min_booking_days")),
    usage_limit: formData.get("usage_limit")
      ? Number(formData.get("usage_limit"))
      : undefined,
    is_active: formData.get("is_active") === "on",
  };

  const validated = promoSchema.safeParse(data);

  if (!validated.success) {
    return {
      error: "Validation failed",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  // 2. Insert to DB
  const { error } = await supabase.from("promos").insert(validated.data);

  if (error) {
    if (error.code === "23505") {
      return { error: "Promo code already exists" };
    }
    return { error: error.message };
  }

  // 3. Revalidate & Redirect
  revalidatePath("/admin/promos");
  redirect("/admin/promos");
}

export async function updatePromoAction(
  id: string,
  _prevState: unknown,
  formData: FormData,
) {
  const supabase = await createClient();

  // 1. Validate Input
  const data = {
    code: formData.get("code") as string,
    description: formData.get("description") as string,
    discount_amount: Number(formData.get("discount_amount")),
    min_booking_days: Number(formData.get("min_booking_days")),
    usage_limit: formData.get("usage_limit")
      ? Number(formData.get("usage_limit"))
      : undefined,
    is_active: formData.get("is_active") === "on",
  };

  const validated = promoSchema.safeParse(data);

  if (!validated.success) {
    return {
      error: "Validation failed",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  // 2. Update DB
  const { error } = await supabase
    .from("promos")
    .update(validated.data)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  // 3. Revalidate & Redirect
  revalidatePath("/admin/promos");
  redirect("/admin/promos");
}

export async function deletePromoAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("promos").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/promos");
}
