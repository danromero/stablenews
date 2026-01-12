import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stablecoin News",
  description: "Latest stablecoin news aggregated from top crypto sources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
