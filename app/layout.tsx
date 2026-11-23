import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://nowcharged.com"),
  title: {
    default: "NowCharged | EV Charging & Dealership Valet in Toronto & GTA",
    template: "%s | NowCharged",
  },
  description: "NowCharged offers door-to-door EV charging and dealership service pickup and return in Toronto and the Greater Toronto Area.",
  keywords: [
    "EV charging valet Toronto",
    "EV charging service Toronto",
    "mobile EV charging GTA",
    "EV charging Mississauga",
    "EV charging Vaughan",
    "EV charging Markham",
    "EV charging Brampton",
    "condo EV charging Toronto",
    "DC fast charging Toronto",
    "someone to charge my EV",
    "EV charging concierge",
    "electric vehicle charging service",
  ],
  authors: [{ name: "NowCharged" }],
  creator: "NowCharged",
  publisher: "NowCharged",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "NowCharged | EV Charging & Dealership Valet in Toronto & GTA",
    description: "Door-to-door EV charging and dealership service valet in Toronto and the GTA.",
    url: "https://nowcharged.com",
    siteName: "NowCharged",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "NowCharged - EV Charging Valet",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NowCharged | EV Charging & Dealership Valet in Toronto & GTA",
    description: "Door-to-door EV charging and dealership service valet in Toronto and the GTA.",
    images: ["/logo.png"],
  },
  // Preview branch only: prevent search indexing.
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://nowcharged.com",
  },
};

// LocalBusiness structured data for local SEO
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://nowcharged.com",
  name: "NowCharged",
  description: "Door-to-door EV charging and dealership service valet in Toronto and the Greater Toronto Area.",
  url: "https://nowcharged.com",
  image: "https://nowcharged.com/logo.png",
  logo: "https://nowcharged.com/logo.png",
  email: "info@nowcharged.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "City", name: "Toronto" },
    { "@type": "City", name: "Mississauga" },
    { "@type": "City", name: "Vaughan" },
    { "@type": "City", name: "Markham" },
    { "@type": "City", name: "Brampton" },
    { "@type": "City", name: "Richmond Hill" },
    { "@type": "City", name: "Oakville" },
    { "@type": "City", name: "Burlington" },
    { "@type": "City", name: "Ajax" },
    { "@type": "City", name: "Pickering" },
    { "@type": "City", name: "Oshawa" },
  ],
  serviceType: ["EV Charging Valet", "Dealership Service Valet"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "EV Charging Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Scheduled Charge",
          description: "A planned EV pickup, DC fast charge, and return to your spot.",
        },
        price: "50.00",
        priceCurrency: "CAD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Same-Day Priority Charge",
          description: "Same-day EV pickup, charge, and return when availability allows.",
        },
        price: "75.00",
        priceCurrency: "CAD",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
