import { isLiveHost, productionOrigin } from "./release";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  if (!(await isLiveHost())) return [];
  return ["/", "/services/ev-charging", "/services/dealership-pickup", "/pricing", "/chargers", "/tools", "/coverage", "/faq", "/trust", "/careers"].map((route) => ({url: productionOrigin + route}));
}
