import { Shield, ShieldAlert } from "lucide-react";

export function RoleActionButton({ role }: { readonly role: string }) {
  if (role === "admin") {
    return (
      <>
        <ShieldAlert className="h-3 w-3" /> Demote
      </>
    );
  }
  return (
    <>
      <Shield className="h-3 w-3" /> Make Admin
    </>
  );
}
