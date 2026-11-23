import "server-only";
import { headers } from "next/headers";

const productionHosts = new Set(["nowcharged.com", "www.nowcharged.com"]);
export const productionOrigin = "https://www.nowcharged.com";

/* If Vercel exposes its environment, an explicit preview / development always
   takes precedence. The canonical request Host is routed by the platform.
   Never use a client-controllable forwarded-host or query override. */
export async function isLiveHost() {
  const environment = process.env.VERCEL_ENV;
  if (environment && environment !== "production") return false;
  const host = (await headers()).get("host");
  return productionHosts.has(host?.toLowerCase());
}
