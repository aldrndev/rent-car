"use client";

import {
  Car,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  Ticket,
  Users,
} from "lucide-react";
import { logoutAction } from "@/app/[locale]/auth/actions";
import { Link, usePathname as useI18nPathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const adminLinks = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/vehicles",
    label: "Vehicles",
    icon: Car,
  },
  {
    href: "/admin/bookings",
    label: "Bookings",
    icon: CreditCard,
  },
  {
    href: "/admin/promos",
    label: "Promos",
    icon: Ticket,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
  },
];

export function AdminSidebar() {
  const pathname = useI18nPathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-surface transition-transform max-md:-translate-x-full">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">Renta</span>
          Go
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
            Admin
          </span>
        </Link>
      </div>

      <div className="flex h-[calc(100vh-64px)] flex-col justify-between overflow-y-auto py-6">
        <nav className="space-y-1 px-3">
          {adminLinks.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-text-muted hover:bg-background/50 hover:text-text",
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 px-3 border-t border-border pt-4">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-background/50 hover:text-text"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <button
            type="button"
            onClick={() => logoutAction()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-error transition-colors hover:bg-error/10"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
