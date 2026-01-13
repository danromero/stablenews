import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stable Gazette",
  description: "Latest stablecoin news aggregated from CoinDesk, Cointelegraph, and more. Updated every 5 minutes.",
  openGraph: {
    title: "Stable Gazette",
    description: "Latest stablecoin news aggregated from CoinDesk, Cointelegraph, and more.",
    url: "https://stablegazette.com",
    siteName: "Stable Gazette",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Stable Gazette",
    description: "Latest stablecoin news aggregated from CoinDesk, Cointelegraph, and more.",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
