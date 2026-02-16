"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleUserRoleAction(
  userId: string,
  currentRole: string,
) {
  const supabase = await createClient();

  const newRole = currentRole === "admin" ? "customer" : "admin";

  const { error } = await supabase
    .from("profiles")
    .update({ role: newRole })
    .eq("id", userId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/users");
}
