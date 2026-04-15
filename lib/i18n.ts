export const SUPPORTED_LOCALES = ["en", "es", "fr", "de"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "ps_locale";

export const LOCALIZED_MARKETING_PATHS = new Set([
  "/",
  "/about",
  "/affiliate",
  "/blog",
  "/contact",
  "/documentation",
  "/faqs",
  "/pricing",
  "/residential-proxies",
  "/mobile-proxies",
  "/datacenter-proxies",
  "/fast-proxies",
  "/proxies-for-instagram",
  "/proxies-for-scraping",
  "/proxies-for-tiktok",
]);

export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const [, maybeLocale] = pathname.split("/");
  return maybeLocale && isLocale(maybeLocale) ? maybeLocale : null;
}

export function stripLocaleFromPathname(pathname: string) {
  const locale = getLocaleFromPathname(pathname);
  if (!locale) return pathname;

  const stripped = pathname.replace(`/${locale}`, "") || "/";
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

export function localizeHref(locale: Locale, href: string) {
  if (!href.startsWith("/")) return href;
  if (
    href.startsWith("/api") ||
    href.startsWith("/auth") ||
    href.startsWith("/dashboard")
  ) {
    return href;
  }

  const [path, suffix = ""] = href.split(/([?#].*)/, 2);
  if (!LOCALIZED_MARKETING_PATHS.has(path)) return href;

  const normalized = path === "/" ? "" : path;
  return `/${locale}${normalized}${suffix}`;
}

export function switchLocaleInPath(pathname: string, targetLocale: Locale) {
  return localizeHref(targetLocale, stripLocaleFromPathname(pathname));
}

export function detectLocale(input?: string | null): Locale {
  const value = (input || "").toLowerCase();

  if (value.includes("es")) return "es";
  if (value.includes("fr")) return "fr";
  if (value.includes("de")) return "de";

  return DEFAULT_LOCALE;
}

type HeaderCopy = {
  navResidential: string;
  navMobile: string;
  navDatacenter: string;
  navFast: string;
  navPricing: string;
  pricingTypes: string;
  pricingPlans: string;
  pricingResources: string;
  pricingResidential: string;
  pricingDatacenter: string;
  pricingMobile: string;
  pricingFast: string;
  pricingStarter: string;
  pricingProfessional: string;
  pricingEnterprise: string;
  pricingBuilder: string;
  pricingCompare: string;
  pricingFeatures: string;
  pricingGuides: string;
  needHelpTitle: string;
  needHelpBody: string;
  contactSales: string;
  faq: string;
  buildCustom: string;
  dashboard: string;
  billing: string;
  settings: string;
  logout: string;
  login: string;
  createAccount: string;
  language: string;
};

type FooterCopy = {
  products: string;
  company: string;
  legal: string;
  about: string;
  affiliate: string;
  blog: string;
  contact: string;
  terms: string;
  privacy: string;
  refunds: string;
  brandDescription: string;
  rights: string;
};

export const uiCopy: Record<Locale, { header: HeaderCopy; footer: FooterCopy }> = {
  en: {
    header: {
      navResidential: "Residential",
      navMobile: "Mobile",
      navDatacenter: "Datacenter",
      navFast: "Fast",
      navPricing: "Pricing",
      pricingTypes: "Proxy Types",
      pricingPlans: "Plans",
      pricingResources: "Resources",
      pricingResidential: "Residential Proxies",
      pricingDatacenter: "Datacenter Proxies",
      pricingMobile: "Mobile Proxies",
      pricingFast: "Fast Proxies",
      pricingStarter: "Starter Plan",
      pricingProfessional: "Professional Plan",
      pricingEnterprise: "Enterprise Plan",
      pricingBuilder: "Build Your Own",
      pricingCompare: "Compare Packages",
      pricingFeatures: "Features Overview",
      pricingGuides: "Proxy Guides",
      needHelpTitle: "Need help choosing?",
      needHelpBody: "Our team can help you find the right proxy setup for scraping, social media, SEO, and automation.",
      contactSales: "Contact Sales",
      faq: "FAQ",
      buildCustom: "Build Custom",
      dashboard: "Dashboard",
      billing: "Billing",
      settings: "Settings",
      logout: "Logout",
      login: "Login",
      createAccount: "Create account",
      language: "Language",
    },
    footer: {
      products: "Products",
      company: "Company",
      legal: "Legal",
      about: "About Us",
      affiliate: "Affiliate",
      blog: "Blog",
      contact: "Contact",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      refunds: "Refund Policy",
      brandDescription: "Residential, Mobile, Datacenter and high-performance proxies for SEO, social media, web scraping, and automation.",
      rights: "All rights reserved.",
    },
  },
  es: {
    header: {
      navResidential: "Residenciales",
      navMobile: "Móviles",
      navDatacenter: "Datacenter",
      navFast: "Rápidos",
      navPricing: "Precios",
      pricingTypes: "Tipos de Proxy",
      pricingPlans: "Planes",
      pricingResources: "Recursos",
      pricingResidential: "Proxies Residenciales",
      pricingDatacenter: "Proxies Datacenter",
      pricingMobile: "Proxies Móviles",
      pricingFast: "Proxies Rápidos",
      pricingStarter: "Plan Inicial",
      pricingProfessional: "Plan Profesional",
      pricingEnterprise: "Plan Enterprise",
      pricingBuilder: "Crea el Tuyo",
      pricingCompare: "Comparar Paquetes",
      pricingFeatures: "Funciones",
      pricingGuides: "Guías de Proxies",
      needHelpTitle: "¿Necesitas ayuda?",
      needHelpBody: "Nuestro equipo te ayuda a elegir la mejor configuración para scraping, redes sociales, SEO y automatización.",
      contactSales: "Hablar con ventas",
      faq: "FAQ",
      buildCustom: "Crear Proxy",
      dashboard: "Panel",
      billing: "Facturación",
      settings: "Ajustes",
      logout: "Salir",
      login: "Iniciar sesión",
      createAccount: "Crear cuenta",
      language: "Idioma",
    },
    footer: {
      products: "Productos",
      company: "Empresa",
      legal: "Legal",
      about: "Sobre Nosotros",
      affiliate: "Afiliados",
      blog: "Blog",
      contact: "Contacto",
      terms: "Términos del Servicio",
      privacy: "Privacidad",
      refunds: "Reembolsos",
      brandDescription: "Proxies residenciales, móviles, datacenter y de alto rendimiento para SEO, social media, scraping web y automatización.",
      rights: "Todos los derechos reservados.",
    },
  },
  fr: {
    header: {
      navResidential: "Résidentiels",
      navMobile: "Mobiles",
      navDatacenter: "Datacenter",
      navFast: "Rapides",
      navPricing: "Tarifs",
      pricingTypes: "Types de Proxy",
      pricingPlans: "Offres",
      pricingResources: "Ressources",
      pricingResidential: "Proxies Résidentiels",
      pricingDatacenter: "Proxies Datacenter",
      pricingMobile: "Proxies Mobiles",
      pricingFast: "Proxies Rapides",
      pricingStarter: "Offre Starter",
      pricingProfessional: "Offre Pro",
      pricingEnterprise: "Offre Enterprise",
      pricingBuilder: "Créer le vôtre",
      pricingCompare: "Comparer les offres",
      pricingFeatures: "Fonctionnalités",
      pricingGuides: "Guides Proxy",
      needHelpTitle: "Besoin d’aide ?",
      needHelpBody: "Notre équipe vous aide à choisir la meilleure configuration pour le scraping, les réseaux sociaux, le SEO et l’automatisation.",
      contactSales: "Contacter les ventes",
      faq: "FAQ",
      buildCustom: "Créer un proxy",
      dashboard: "Dashboard",
      billing: "Facturation",
      settings: "Paramètres",
      logout: "Déconnexion",
      login: "Connexion",
      createAccount: "Créer un compte",
      language: "Langue",
    },
    footer: {
      products: "Produits",
      company: "Entreprise",
      legal: "Légal",
      about: "À propos",
      affiliate: "Affiliation",
      blog: "Blog",
      contact: "Contact",
      terms: "Conditions d’utilisation",
      privacy: "Politique de confidentialité",
      refunds: "Politique de remboursement",
      brandDescription: "Proxies résidentiels, mobiles, datacenter et haute performance pour le SEO, les réseaux sociaux, le scraping web et l’automatisation.",
      rights: "Tous droits réservés.",
    },
  },
  de: {
    header: {
      navResidential: "Residential",
      navMobile: "Mobile",
      navDatacenter: "Datacenter",
      navFast: "Schnell",
      navPricing: "Preise",
      pricingTypes: "Proxy-Typen",
      pricingPlans: "Pakete",
      pricingResources: "Ressourcen",
      pricingResidential: "Residential Proxies",
      pricingDatacenter: "Datacenter Proxies",
      pricingMobile: "Mobile Proxies",
      pricingFast: "Schnelle Proxies",
      pricingStarter: "Starter-Paket",
      pricingProfessional: "Professional-Paket",
      pricingEnterprise: "Enterprise-Paket",
      pricingBuilder: "Eigenes Proxy bauen",
      pricingCompare: "Pakete vergleichen",
      pricingFeatures: "Funktionen",
      pricingGuides: "Proxy-Guides",
      needHelpTitle: "Hilfe bei der Auswahl?",
      needHelpBody: "Unser Team hilft Ihnen bei der passenden Proxy-Strategie für Scraping, Social Media, SEO und Automatisierung.",
      contactSales: "Vertrieb kontaktieren",
      faq: "FAQ",
      buildCustom: "Proxy bauen",
      dashboard: "Dashboard",
      billing: "Abrechnung",
      settings: "Einstellungen",
      logout: "Abmelden",
      login: "Login",
      createAccount: "Konto erstellen",
      language: "Sprache",
    },
    footer: {
      products: "Produkte",
      company: "Unternehmen",
      legal: "Rechtliches",
      about: "Über uns",
      affiliate: "Affiliate",
      blog: "Blog",
      contact: "Kontakt",
      terms: "Nutzungsbedingungen",
      privacy: "Datenschutz",
      refunds: "Rückerstattung",
      brandDescription: "Residential-, Mobile-, Datacenter- und High-Performance-Proxies für SEO, Social Media, Web Scraping und Automatisierung.",
      rights: "Alle Rechte vorbehalten.",
    },
  },
};
