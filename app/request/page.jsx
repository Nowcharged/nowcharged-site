import PickupPreview from "./pickup-preview";

export const metadata = { title: "Explore a pickup" };

export default async function RequestPage({ searchParams }) {
  const raw = (await searchParams)?.service;
  const service = raw === "ev" || raw === "dealer" ? raw : "";
  return <PickupPreview key={service} initialService={service} />;
}
