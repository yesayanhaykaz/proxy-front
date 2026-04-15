import type { Metadata } from "next";
import { getSiteOrigin } from "@/lib/env";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";

export function buildAlternates(pathname: string) {
  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [
      locale,
      locale === DEFAULT_LOCALE ? pathname : `/${locale}${pathname === "/" ? "" : pathname}`,
    ])
  );

  return {
    canonical:
      DEFAULT_LOCALE === "en" ? pathname : `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`,
    languages,
  };
}

export function buildLocalizedMetadata(args: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  keywords?: string[];
}) {
  const { locale, pathname, title, description, keywords = [] } = args;
  const site = getSiteOrigin();
  const localizedPath =
    locale === DEFAULT_LOCALE ? pathname : `/${locale}${pathname === "/" ? "" : pathname}`;

  return {
    metadataBase: new URL(site),
    title,
    description,
    keywords,
    alternates: buildAlternates(pathname),
    openGraph: {
      type: "website",
      locale,
      url: localizedPath,
      siteName: "Proxiesseller",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  } satisfies Metadata;
}
