import "./globals.css";

export const metadata = {
  title: "NowCharged",
  description: "Mobile EV Charging",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
