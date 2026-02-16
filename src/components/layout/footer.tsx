import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-border bg-surface px-4 py-8">
      <div className="mx-auto max-w-7xl text-center text-sm text-text-muted">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-primary">
            {t("common.appName")}
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
