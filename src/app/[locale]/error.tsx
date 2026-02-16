"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("common");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
      <div className="mb-4 rounded-full bg-error/10 p-4 text-error">
        <AlertTriangle className="h-10 w-10" />
      </div>
      <h2 className="mb-2 text-2xl font-bold">{t("errorTitle")}</h2>
      <p className="mb-8 max-w-md text-text-muted">{t("errorDesc")}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-transform hover:scale-105 active:scale-95"
      >
        <RefreshCcw className="h-4 w-4" />
        {t("tryAgain")}
      </button>
    </div>
  );
}
