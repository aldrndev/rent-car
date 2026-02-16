"use client";

import {
  Car,
  ChevronDown,
  LogOut,
  MapPin,
  Menu,
  Moon,
  Shield,
  Sun,
  User,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { logoutAction } from "@/app/[locale]/auth/actions";
import { useTheme } from "@/components/providers/theme-provider";
import { Link, usePathname } from "@/i18n/navigation";

interface NavbarClientProps {
  user: {
    email: string;
    fullName: string;
    role: "customer" | "admin";
  } | null;
}

export function NavbarClient({ user }: Readonly<NavbarClientProps>) {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { href: "/vehicles", label: t("common.vehicles"), icon: Car },
    { href: "/track", label: t("common.trackBooking"), icon: MapPin },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          {t("common.appName")}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive(href)
                  ? "bg-primary/10 text-primary"
                  : "text-text-muted hover:bg-surface-hover hover:text-text"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-hover hover:text-text"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {user ? (
            <>
              {/* My Bookings - Only for customers */}
              {user.role !== "admin" && (
                <Link
                  href="/my-bookings"
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive("/my-bookings")
                      ? "bg-primary/10 text-primary"
                      : "text-text-muted hover:bg-surface-hover hover:text-text"
                  }`}
                >
                  {t("common.myBookings")}
                </Link>
              )}

              {/* Admin Link */}
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive("/admin")
                      ? "bg-primary/10 text-primary"
                      : "text-text-muted hover:bg-surface-hover hover:text-text"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  {t("common.admin")}
                </Link>
              )}

              {/* User Dropdown */}
              <div className="relative ml-2">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:border-primary/50 hover:bg-surface-hover"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-24 truncate text-text">
                    {user.fullName}
                  </span>
                  <ChevronDown
                    className={`h-3 w-3 text-text-muted transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {dropdownOpen && (
                  <>
                    <button
                      type="button"
                      className="fixed inset-0 z-40 cursor-default"
                      onClick={() => setDropdownOpen(false)}
                      tabIndex={-1}
                      aria-label="Close dropdown"
                    />
                    <div className="absolute right-0 top-full z-50 mt-2 w-56 animate-slide-down rounded-xl border border-border bg-surface p-2 shadow-lg">
                      <div className="border-b border-border px-3 py-2">
                        <p className="text-sm font-medium text-text">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-text-muted">{user.email}</p>
                      </div>
                      <form action={logoutAction} className="mt-1">
                        <button
                          type="submit"
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-error transition-colors hover:bg-error/10"
                        >
                          <LogOut className="h-4 w-4" />
                          {t("common.logout")}
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              {t("common.login")}
            </Link>
          )}
        </nav>

        {/* Mobile: theme toggle + menu button */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-hover"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-hover"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="animate-slide-down border-t border-border bg-surface p-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive(href)
                    ? "bg-primary/10 text-primary"
                    : "text-text-muted hover:bg-surface-hover hover:text-text"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}

            {user ? (
              <>
                {user.role !== "admin" && (
                  <Link
                    href="/my-bookings"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-surface-hover"
                  >
                    <User className="h-4 w-4" />
                    {t("common.myBookings")}
                  </Link>
                )}

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-muted transition-colors hover:bg-surface-hover"
                  >
                    <Shield className="h-4 w-4" />
                    {t("common.admin")}
                  </Link>
                )}

                <div className="my-2 border-t border-border" />
                <div className="px-3 py-1.5">
                  <p className="text-sm font-medium text-text">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-text-muted">{user.email}</p>
                </div>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-error transition-colors hover:bg-error/10"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("common.logout")}
                  </button>
                </form>
              </>
            ) : (
              <div className="mt-2 flex gap-2">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                >
                  {t("common.login")}
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-text transition-colors hover:bg-surface-hover"
                >
                  {t("common.register")}
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
