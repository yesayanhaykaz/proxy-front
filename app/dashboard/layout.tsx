import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const c = cookies();
  const isLoggedIn = Boolean(c.get("ps_session")?.value);

  if (!isLoggedIn) redirect("/auth/login?next=/dashboard");

  return (
    <>
        <link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<link rel="manifest" href="/site.webmanifest" />

<meta name="theme-color" content="#7c3aed" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      {children}
    </>
  );
}
