import { getStablecoinNews } from "@/lib/rss";

export const revalidate = 300;

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const { articles } = await getStablecoinNews(50);

  const items = articles.map((article) => {
    const title = escapeXml(article.title);
    const link = escapeXml(article.link);
    const source = escapeXml(article.source);
    const description = article.description ? escapeXml(article.description) : "";

    return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(article.pubDate).toUTCString()}</pubDate>
      <source url="${link}">${source}</source>
      ${description ? `<description>${description}</description>` : ""}
    </item>`;
  }).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Stable Gazette</title>
    <link>https://stablegazette.com</link>
    <description>Latest stablecoin news aggregated from CoinDesk, Cointelegraph, and more.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://stablegazette.com/feed.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
