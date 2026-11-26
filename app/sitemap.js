import { isLiveHost, productionOrigin } from "./release";
import { chargingTopics } from "./chargers/topics.mjs";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  if (!(await isLiveHost())) return [];
  return ["/", "/home", "/services/ev-charging", "/services/dealership-pickup", "/pricing", "/chargers", "/ev-101", "/ev-database", "/tools", "/coverage", "/faq", "/trust", "/careers", ...chargingTopics.map(({slug})=>"/chargers/"+slug)].map((route) => ({url: productionOrigin + route}));
}
