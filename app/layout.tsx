import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import { Header } from "@/components/Header.server";
import { Footer } from "@/components/Footer";
import LiveChat from "@/components/LiveChat";

import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://proxiesseller.cc"
  ),
  title: {
    default: "Proxiesseller — Residential, Mobile & Datacenter Proxies",
    template: "%s | Proxiesseller",
  },
  description:
    "Buy fast, reliable proxies: Residential, Mobile, Datacenter & SOCKS5. Instant setup, global locations, and flexible pricing.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Proxiesseller",
    title: "Proxiesseller — Residential, Mobile & Datacenter Proxies",
    description:
      "Buy fast, reliable proxies: Residential, Mobile, Datacenter & SOCKS5. Instant setup, global locations, and flexible pricing.",
  },
  robots: { index: true, follow: true },
};

export const dynamic = "force-dynamic"; // Header reads cookies

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 🔥 Yandex Metrika */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) { return; }
                  }
                  k=e.createElement(t),
                  a=e.getElementsByTagName(t)[0],
                  k.async=1,
                  k.src=r,
                  a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');

              ym(103288439, 'init', {
                webvisor:true,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
              });
            `,
          }}
        />
      </head>

      <body className="min-h-screen bg-white text-slate-900">
        <Header />

        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>

        <Footer />

        {/* Live chat widget */}
        <LiveChat />

        {/* NoScript fallback */}
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/103288439"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
