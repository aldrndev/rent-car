"use client";

import { User, UserCircle2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

interface BookingAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGuest: () => void;
  loginUrl: string;
}

export function BookingAuthModal({
  isOpen,
  onClose,
  onGuest,
  loginUrl,
}: Readonly<BookingAuthModalProps>) {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity animate-fade-in">
      <div className="relative w-full max-w-sm rounded-2xl bg-surface p-6 shadow-xl animate-scale-in border border-border">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-text-muted hover:text-text transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-2">
            {t("booking.authModalTitle")}
          </h2>
          <p className="text-sm text-text-muted">
            {t("booking.authModalSubtitle")}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            href={loginUrl}
            className="flex w-full items-center justify-center rounded-xl bg-primary py-3 font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            <UserCircle2 className="mr-2 h-5 w-5" />
            {t("booking.loginOrRegister")}
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface px-2 text-text-muted">
                {t("common.or")}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onGuest}
            className="flex w-full items-center justify-center rounded-xl border border-border bg-transparent py-3 font-semibold text-text transition-colors hover:bg-surface-hover"
          >
            <User className="mr-2 h-4 w-4" />
            {t("booking.continueAsGuest")}
          </button>
        </div>
      </div>
    </div>
  );
}
