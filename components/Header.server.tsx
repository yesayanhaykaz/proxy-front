import { cookies } from "next/headers";
import { HeaderClient } from "@/components/HeaderClient";

export function Header() {
  const c = cookies();

  const session = c.get("ps_session")?.value;
  const email = c.get("ps_email")?.value || "";

  const isLoggedIn = Boolean(session);

  return <HeaderClient isLoggedIn={isLoggedIn} email={email} />;
}
