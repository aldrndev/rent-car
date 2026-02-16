import { getUser } from "@/lib/auth";
import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const result = await getUser();

  return (
    <NavbarClient
      user={
        result
          ? {
              email: result.user.email,
              fullName: result.profile.full_name,
              role: result.profile.role,
            }
          : null
      }
    />
  );
}
