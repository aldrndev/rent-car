"use client";

import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { User } from "lucide-react";
import { useState } from "react";
import { toggleUserRoleAction } from "@/app/[locale]/admin/users/actions";
import { Badge } from "@/components/ui/badge";
import { RoleActionButton } from "./role-action-button";

interface Profile {
  id: string;
  full_name: string;
  email?: string; // Explicitly add email which might come from a join or auth wrapper, though profiles usually don't have email in this schema, wait.
  // checking schema in implementation_plan.md: profiles has (id, full_name, phone, role). Email is in auth.users.
  // The fetch query in page.tsx needs to handle this.
  // Actually Supabase doesn't easily join auth.users.
  // For now I will display what's in profiles: full_name, phone, role.
  phone: string | null;
  role: string;
  created_at: string;
}

import { PaginationControls } from "@/components/ui/pagination-controls";

interface UserTableProps {
  users: Profile[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
}

export function UserTable({
  users,
  currentPage,
  totalPages,
  totalUsers,
}: Readonly<UserTableProps>) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggleRole = async (userId: string, currentRole: string) => {
    if (
      confirm(
        `Are you sure you want to change this user's role to ${currentRole === "admin" ? "customer" : "admin"}?`,
      )
    ) {
      setLoadingId(userId);
      await toggleUserRoleAction(userId, currentRole);
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-semibold">All Users</h2>
          <span className="text-sm text-text-muted">
            {totalUsers} registered users
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-hover text-text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Joined At</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-text-muted"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 font-medium">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <User className="h-4 w-4" />
                        </div>
                        <span>{user.full_name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-text-muted">
                      {user.phone || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          user.role === "admin" ? "destructive" : "default"
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-text-muted">
                      {format(new Date(user.created_at), "dd MMM yyyy", {
                        locale: idLocale,
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggleRole(user.id, user.role)}
                        disabled={loadingId === user.id}
                        className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10 disabled:opacity-50"
                      >
                        {loadingId === user.id ? (
                          "Updating..."
                        ) : (
                          <RoleActionButton role={user.role} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PaginationControls currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
