import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const c = cookies();
  const isLoggedIn = Boolean(c.get("ps_session")?.value);

  if (!isLoggedIn) redirect("/auth/login?next=/dashboard");

  return <>{children}</>;
}
