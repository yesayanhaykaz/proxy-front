import type { Locale } from "@/lib/i18n";

export function getHomeContent(locale: Locale) {
  const content = {
    en: {
      badge: "High-intent proxy platform",
      title: "Proxy infrastructure built to win",
      highlight: "SEO, scraping, and social media",
      subtitle:
        "Launch residential, mobile, datacenter, and high-speed proxy campaigns with localized landing pages, stronger conversion copy, and routing built for TikTok, SERP collection, and large-scale automation.",
      primaryCta: "See pricing",
      secondaryCta: "Build your proxy",
      stats: [
        { value: "195+", label: "Target locations" },
        { value: "99.9%", label: "Platform uptime" },
        { value: "<200ms", label: "Low-latency routes" },
      ],
      audienceTitle: "Built for acquisition teams",
      audienceBody:
        "From rank tracking and product intelligence to account management and TikTok growth, Proxiesseller is positioned as a performance-first proxy brand with premium landing pages that search engines and buyers both understand.",
      cards: [
        { title: "Localized SEO pages", body: "Geo-ready landing pages with clearer search intent for scraping proxies, social media proxies, and SERP workflows." },
        { title: "Safer account workflows", body: "Use sticky sessions and high-trust IP pools for TikTok, Instagram, and multi-account operations." },
        { title: "Global delivery", body: "Country-aware messaging and market-specific pages to help users find the right offer faster." },
      ],
      seoTitle: "SEO Teams",
      seoBody: "Rank tracking, SERP monitoring, keyword intelligence, and content research.",
      socialTitle: "Social Media",
      socialBody: "TikTok growth, agency account stacks, moderation workflows, and automation.",
      scrapingTitle: "Scraping & Data",
      scrapingBody: "E-commerce feeds, public web extraction, pricing intelligence, and anti-bot resistant collection.",
      finalTitle: "Eye-catching landing pages. Stronger rankings. Better proxy conversions.",
      finalBody:
        "Use localized commercial pages to capture high-intent traffic in Spain, France, Germany, and English-speaking markets while keeping the purchase flow fast.",
    },
    es: {
      badge: "Plataforma de proxies orientada a conversión",
      title: "Infraestructura proxy creada para ganar en",
      highlight: "SEO, scraping y redes sociales",
      subtitle:
        "Lanza campañas con proxies residenciales, móviles, datacenter y de alto rendimiento con páginas localizadas y mensajes pensados para TikTok, scraping y automatización.",
      primaryCta: "Ver precios",
      secondaryCta: "Crear proxy",
      stats: [
        { value: "195+", label: "Ubicaciones" },
        { value: "99.9%", label: "Uptime" },
        { value: "<200ms", label: "Rutas rápidas" },
      ],
      audienceTitle: "Pensado para equipos de crecimiento",
      audienceBody:
        "Desde SEO y monitorización de SERP hasta gestión de cuentas y crecimiento en TikTok, Proxiesseller se presenta como una marca premium con páginas más claras para Google y para el comprador.",
      cards: [
        { title: "Páginas SEO localizadas", body: "Landings por idioma y mercado para captar búsquedas de scraping proxies, proxies para redes sociales y SEO." },
        { title: "Cuentas más seguras", body: "Sesiones sticky e IPs de mayor confianza para TikTok, Instagram y operaciones multi-cuenta." },
        { title: "Cobertura global", body: "Mensajes adaptados por mercado para que cada visitante vea una oferta más relevante." },
      ],
      seoTitle: "Equipos SEO",
      seoBody: "Seguimiento de rankings, monitorización de SERP, inteligencia de keywords e investigación.",
      socialTitle: "Social Media",
      socialBody: "Crecimiento en TikTok, agencias, gestión de cuentas y automatización.",
      scrapingTitle: "Scraping y datos",
      scrapingBody: "Extracción web, inteligencia de precios, feeds e-commerce y recolección resistente a bloqueos.",
      finalTitle: "Landings más atractivas. Mejor posicionamiento. Más ventas.",
      finalBody:
        "Capta tráfico de alta intención en España, Francia, Alemania y mercados angloparlantes con páginas comerciales localizadas.",
    },
    fr: {
      badge: "Plateforme proxy orientée conversion",
      title: "Une infrastructure proxy pensée pour",
      highlight: "le SEO, le scraping et les réseaux sociaux",
      subtitle:
        "Déployez des offres résidentielles, mobiles, datacenter et haute performance avec des pages localisées pour TikTok, le scraping web et l’automatisation à grande échelle.",
      primaryCta: "Voir les tarifs",
      secondaryCta: "Créer votre proxy",
      stats: [
        { value: "195+", label: "Zones cibles" },
        { value: "99.9%", label: "Disponibilité" },
        { value: "<200ms", label: "Latence faible" },
      ],
      audienceTitle: "Conçu pour les équipes d’acquisition",
      audienceBody:
        "Suivi de positions, collecte SERP, gestion de comptes et croissance TikTok : Proxiesseller devient une marque proxy plus lisible pour Google et plus convaincante pour l’acheteur.",
      cards: [
        { title: "Pages SEO localisées", body: "Des pages par marché pour les requêtes scraping proxies, social media proxies et SEO proxies." },
        { title: "Flux comptes plus sûrs", body: "Sessions sticky et IP à forte confiance pour TikTok, Instagram et la gestion multi-comptes." },
        { title: "Portée mondiale", body: "Un message adapté par pays pour afficher la bonne offre au bon visiteur." },
      ],
      seoTitle: "Équipes SEO",
      seoBody: "Suivi de rankings, surveillance SERP, recherche de mots-clés et intelligence concurrentielle.",
      socialTitle: "Réseaux sociaux",
      socialBody: "TikTok, gestion d’agence, modération, multi-comptes et automatisation.",
      scrapingTitle: "Scraping & Data",
      scrapingBody: "Collecte e-commerce, extraction web publique, veille tarifaire et pipelines data.",
      finalTitle: "Des pages plus fortes. Un meilleur SEO. Plus de conversions.",
      finalBody:
        "Captez le trafic à forte intention en France, en Espagne, en Allemagne et sur les marchés anglophones avec des pages commerciales localisées.",
    },
    de: {
      badge: "Proxy-Plattform für Conversion und Wachstum",
      title: "Proxy-Infrastruktur für",
      highlight: "SEO, Scraping und Social Media",
      subtitle:
        "Starte Residential-, Mobile-, Datacenter- und Performance-Proxies mit lokalisierten Landingpages für TikTok, SERP-Monitoring und datenintensive Automatisierung.",
      primaryCta: "Preise ansehen",
      secondaryCta: "Proxy bauen",
      stats: [
        { value: "195+", label: "Standorte" },
        { value: "99.9%", label: "Uptime" },
        { value: "<200ms", label: "Niedrige Latenz" },
      ],
      audienceTitle: "Für Growth- und SEO-Teams gebaut",
      audienceBody:
        "Von Rank-Tracking und SERP-Scraping bis TikTok-Operations und Account-Management positioniert sich Proxiesseller als klarere und stärker konvertierende Proxy-Marke.",
      cards: [
        { title: "Lokalisierte SEO-Seiten", body: "Marktspezifische Landingpages für scraping proxies, social media proxies und SEO-Proxies." },
        { title: "Sichere Account-Workflows", body: "Sticky Sessions und vertrauensstarke IP-Pools für TikTok, Instagram und Multi-Account-Setups." },
        { title: "Globale Reichweite", body: "Marktspezifische Botschaften, damit jede Zielgruppe das passende Angebot sieht." },
      ],
      seoTitle: "SEO-Teams",
      seoBody: "Ranking-Tracking, SERP-Monitoring, Keyword-Recherche und Wettbewerbsdaten.",
      socialTitle: "Social Media",
      socialBody: "TikTok-Wachstum, Agentur-Accounts, Moderation und Automatisierung.",
      scrapingTitle: "Scraping & Daten",
      scrapingBody: "E-Commerce-Feeds, öffentliche Webdaten, Preis-Intelligence und Anti-Bot-resistente Datenerfassung.",
      finalTitle: "Stärkere Landingpages. Besseres Ranking. Mehr Abschlüsse.",
      finalBody:
        "Gewinne kaufbereiten Traffic in Deutschland, Spanien, Frankreich und englischsprachigen Märkten mit lokalisierten Commercial Pages.",
    },
  } as const;

  return content[locale];
}

export function getPricingContent(locale: Locale) {
  const content = {
    en: {
      title: "Proxy pricing for SEO, TikTok, social media, and scraping",
      body: "Choose the proxy stack that matches your acquisition workflow. Compare location coverage, rotation strategy, protocol support, and plan economics in one place.",
      labels: {
        filterPlans: "Filter plans",
        resetFilters: "Reset filters",
        allProxyTypes: "All Proxy Types",
        allCountries: "All Countries",
        allRotation: "All Rotation",
        allDurations: "All Durations",
        allProtocols: "All Protocols",
        noPlansFound: "No plans found",
        noPlansBody: "Try resetting filters or using fewer filters.",
        buyNow: "Buy now",
        rotating: "Rotating",
        static: "Static",
      },
    },
    es: {
      title: "Precios de proxies para SEO, TikTok, social media y scraping",
      body: "Compara coberturas, rotación, protocolos y coste para elegir la infraestructura proxy adecuada para tu flujo de adquisición.",
      labels: {
        filterPlans: "Filtrar planes",
        resetFilters: "Restablecer filtros",
        allProxyTypes: "Todos los tipos",
        allCountries: "Todos los países",
        allRotation: "Toda la rotación",
        allDurations: "Todas las duraciones",
        allProtocols: "Todos los protocolos",
        noPlansFound: "No se encontraron planes",
        noPlansBody: "Prueba a restablecer los filtros o usar menos filtros.",
        buyNow: "Comprar",
        rotating: "Rotación",
        static: "Estático",
      },
    },
    fr: {
      title: "Tarifs proxy pour le SEO, TikTok, les réseaux sociaux et le scraping",
      body: "Comparez la couverture, la rotation, les protocoles et le coût pour choisir l’offre la plus adaptée à votre workflow d’acquisition.",
      labels: {
        filterPlans: "Filtrer les offres",
        resetFilters: "Réinitialiser",
        allProxyTypes: "Tous les types",
        allCountries: "Tous les pays",
        allRotation: "Toutes les rotations",
        allDurations: "Toutes les durées",
        allProtocols: "Tous les protocoles",
        noPlansFound: "Aucune offre trouvée",
        noPlansBody: "Essayez de réinitialiser les filtres ou d’en utiliser moins.",
        buyNow: "Acheter",
        rotating: "Rotatif",
        static: "Statique",
      },
    },
    de: {
      title: "Proxy-Preise für SEO, TikTok, Social Media und Scraping",
      body: "Vergleiche Abdeckung, Rotation, Protokolle und Kosten, um das richtige Proxy-Setup für dein Wachstumsteam zu finden.",
      labels: {
        filterPlans: "Pakete filtern",
        resetFilters: "Filter zurücksetzen",
        allProxyTypes: "Alle Proxy-Typen",
        allCountries: "Alle Länder",
        allRotation: "Alle Rotationen",
        allDurations: "Alle Laufzeiten",
        allProtocols: "Alle Protokolle",
        noPlansFound: "Keine Pakete gefunden",
        noPlansBody: "Setze die Filter zurück oder verwende weniger Filter.",
        buyNow: "Jetzt kaufen",
        rotating: "Rotierend",
        static: "Statisch",
      },
    },
  } as const;

  return content[locale];
}
