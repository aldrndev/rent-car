"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { type VehicleFormData, vehicleSchema } from "@/schemas/vehicle";

export async function deleteVehicleAction(id: string) {
  const supabase = await createClient();

  // 1. Check auth & role (Double check)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { error: "Forbidden" };
  }

  // 2. Delete vehicle
  const { error } = await supabase.from("vehicles").delete().eq("id", id);

  if (error) {
    console.error("Delete vehicle error:", error);
    return { error: "Failed to delete vehicle" };
  }

  revalidatePath("/admin/vehicles");
  return { success: true };
}

export async function createVehicleAction(data: VehicleFormData) {
  const supabase = await createClient();

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return { error: "Forbidden" };

  // Validate
  const validation = vehicleSchema.safeParse(data);
  if (!validation.success) {
    return { error: "Validation failed" };
  }

  const { error } = await supabase.from("vehicles").insert(validation.data);

  if (error) {
    console.error("Create vehicle error:", error);
    return { error: "Failed to create vehicle" };
  }

  revalidatePath("/admin/vehicles");
  return { success: true };
}

export async function updateVehicleAction(id: string, data: VehicleFormData) {
  const supabase = await createClient();

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return { error: "Forbidden" };

  // Validate
  const validation = vehicleSchema.safeParse(data);
  if (!validation.success) {
    return { error: "Validation failed" };
  }

  const { error } = await supabase
    .from("vehicles")
    .update(validation.data)
    .eq("id", id);

  if (error) {
    console.error("Update vehicle error:", error);
    return { error: "Failed to update vehicle" };
  }

  revalidatePath("/admin/vehicles");
  revalidatePath(`/admin/vehicles/${id}`);
  return { success: true };
}
