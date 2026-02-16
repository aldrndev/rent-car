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
import { useEffect, useState } from "react";
import { logoutAction } from "@/app/[locale]/auth/actions";
import { useTheme } from "@/components/providers/theme-provider";
import { Link, usePathname } from "@/i18n/navigation";

type AuthUser = {
  email: string;
  fullName: string;
  role: "customer" | "admin";
};

interface NavbarClientProps {
  user: AuthUser | null;
}

export function NavbarClient({ user }: Readonly<NavbarClientProps>) {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { href: "/vehicles", label: t("common.vehicles"), icon: Car },
    { href: "/track", label: t("common.trackBooking"), icon: MapPin },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 p-2 ${
        isScrolled
          ? "border-b border-border bg-surface/80 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-primary">
          {t("common.appName")}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-base transition-colors ${
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
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-base transition-colors ${
                    isActive("/my-bookings")
                      ? "bg-primary/10 text-primary"
                      : "text-text-muted hover:bg-surface-hover hover:text-text"
                  }`}
                >
                  {t("common.myBookings")}
                </Link>
              )}

              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-base transition-colors ${
                    isActive("/admin")
                      ? "bg-primary/10 text-primary"
                      : "text-text-muted hover:bg-surface-hover hover:text-text"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  {t("common.admin")}
                </Link>
              )}

              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <UserDropdown user={user} t={t} />
            </>
          ) : (
            <Link
              href="/auth/login"
              className="ml-2 rounded-lg bg-primary px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-primary-hover"
            >
              {t("common.login")}
            </Link>
          )}
        </nav>

        {/* Mobile: theme toggle + menu button */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} mobile />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-hover"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileOpen}
        setIsOpen={setMobileOpen}
        navLinks={navLinks}
        user={user}
        t={t}
        isActive={isActive}
      />
    </header>
  );
}

function ThemeToggle({
  theme,
  toggleTheme,
  mobile = false,
}: Readonly<{
  theme: string | undefined;
  toggleTheme: () => void;
  mobile?: boolean;
}>) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`rounded-lg p-2 text-text-muted transition-colors hover:bg-surface-hover hover:text-text ${mobile ? "" : "hidden md:flex"}`}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {theme === "dark" ? (
        <Sun className={mobile ? "h-5 w-5" : "h-4 w-4"} />
      ) : (
        <Moon className={mobile ? "h-5 w-5" : "h-4 w-4"} />
      )}
    </button>
  );
}

function UserDropdown({
  user,
  t,
}: Readonly<{
  user: AuthUser;
  t: (key: string) => string;
}>) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative ml-2">
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-base transition-colors hover:border-primary/50 hover:bg-surface-hover"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
          {user.fullName.charAt(0).toUpperCase()}
        </div>
        <span className="max-w-24 truncate text-text">{user.fullName}</span>
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
              <p className="text-sm font-medium text-text">{user.fullName}</p>
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
  );
}

function MobileMenu({
  isOpen,
  setIsOpen,
  navLinks,
  user,
  t,
  isActive,
}: Readonly<{
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  // biome-ignore lint/suspicious/noExplicitAny: generic icon component type difficult to specify precisely
  navLinks: { href: string; label: string; icon: any }[];
  user: AuthUser | null;
  t: (key: string) => string;
  isActive: (href: string) => boolean;
}>) {
  if (!isOpen) return null;

  return (
    <div className="animate-slide-down border-t border-border bg-surface p-4 md:hidden">
      <nav className="flex flex-col gap-1">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-base transition-colors ${
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
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base text-text-muted transition-colors hover:bg-surface-hover"
              >
                <User className="h-4 w-4" />
                {t("common.myBookings")}
              </Link>
            )}

            {user.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base text-text-muted transition-colors hover:bg-surface-hover"
              >
                <Shield className="h-4 w-4" />
                {t("common.admin")}
              </Link>
            )}

            <div className="my-2 border-t border-border" />
            <div className="px-3 py-1.5">
              <p className="text-sm font-medium text-text">{user.fullName}</p>
              <p className="text-xs text-text-muted">{user.email}</p>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-base text-error transition-colors hover:bg-error/10"
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
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-center text-base font-medium text-white transition-colors hover:bg-primary-hover"
            >
              {t("common.login")}
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-lg border border-border px-4 py-2.5 text-center text-base font-medium text-text transition-colors hover:bg-surface-hover"
            >
              {t("common.register")}
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
