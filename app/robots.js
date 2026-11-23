import { isLiveHost, productionOrigin } from "./release";

export const dynamic = "force-dynamic";

export default async function robots() {
  if (!(await isLiveHost())) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/request", "/thank-you"] }, sitemap: productionOrigin + "/sitemap.xml" };
}
