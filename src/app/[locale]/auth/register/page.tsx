"use client";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  Gift,
  Lock,
  Mail,
  Phone,
  User,
  UserPlus,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Suspense, useState, useTransition } from "react";
import { Link } from "@/i18n/navigation";
import { registerAction } from "../actions";

function RegisterForm() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const loginUrl = next ? `/auth/login?next=${next}` : "/auth/login";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await registerAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="w-full max-w-md animate-fade-in">
      {/* Back to Home */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("common.backToHome")}
      </Link>

      {/* Promo Banner */}
      <div className="mb-6 rounded-xl bg-linear-to-r from-primary/20 to-secondary/20 border border-primary/30 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
            <Gift className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text">
              {t("auth.promoBanner")}
            </p>
            <p className="text-xs text-text-muted">
              {t("auth.promoCode")}:{" "}
              <span className="font-mono font-bold text-primary">
                WELCOME50K
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-glow">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <UserPlus className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">{t("auth.registerTitle")}</h1>
          <p className="mt-2 text-sm text-text-muted">
            {t("auth.registerSubtitle")}
          </p>
        </div>
        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">
            {error}
          </div>
        )}
        {/* Form */}
        <form action={handleSubmit} className="space-y-5">
          <input type="hidden" name="next" value={next || ""} />

          {/* Full Name */}
          <div>
            <label
              htmlFor="full_name"
              className="mb-1.5 block text-sm font-medium text-text-muted"
            >
              {t("auth.fullName")}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                autoComplete="name"
                placeholder={t("auth.fullNamePlaceholder")}
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm transition-colors placeholder:text-text-muted/50 focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-text-muted"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="email@example.com"
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm transition-colors placeholder:text-text-muted/50 focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Phone (Optional) */}
          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-medium text-text-muted"
            >
              {t("auth.phone")}{" "}
              <span className="text-text-muted/50">
                ({t("common.optional")})
              </span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="08xxxxxxxxxx"
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm transition-colors placeholder:text-text-muted/50 focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-text-muted"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-10 text-sm transition-colors placeholder:text-text-muted/50 focus:border-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-1 text-xs text-text-muted">
              {t("auth.passwordHint")}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? t("common.loading") : t("auth.registerButton")}
          </button>
        </form>
        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-text-muted">
          {t("auth.hasAccount")}{" "}
          <Link
            href={loginUrl}
            className="font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            {t("auth.loginHere")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
