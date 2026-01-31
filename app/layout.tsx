import type { Metadata } from "next";
import "./globals.css";

import { Header } from "@/components/Header.server";
import { Footer } from "@/components/Footer";
import LiveChat from "@/components/LiveChat";

import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://proxiesseller.cc"),
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

export const dynamic = "force-dynamic"; // ✅ important since Header reads cookies

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <Header />

        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>

        <Footer />

        {/* ✅ MUST be inside body */}
        <LiveChat />
      </body>
    </html>
  );
}
