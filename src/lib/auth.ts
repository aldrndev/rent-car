import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

/** Get the current authenticated user + profile. Returns null if not logged in. */
export async function getUser(): Promise<{
  user: { id: string; email: string };
  profile: Profile;
} | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  return {
    user: { id: user.id, email: user.email ?? "" },
    profile,
  };
}

/** Require authentication. Redirects to login if not authenticated. */
export async function requireAuth() {
  const result = await getUser();
  if (!result) {
    redirect("/auth/login");
  }
  return result;
}

/** Require admin role. Redirects to home if not admin. */
export async function requireAdmin() {
  const result = await requireAuth();
  if (result.profile.role !== "admin") {
    redirect("/");
  }
  return result;
}
