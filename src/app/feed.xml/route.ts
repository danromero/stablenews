import { getStablecoinNews } from "@/lib/rss";

export const revalidate = 300;

export async function GET() {
  const { articles } = await getStablecoinNews(50);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Stable Gazette</title>
    <link>https://stablegazette.com</link>
    <description>Latest stablecoin news aggregated from CoinDesk, Cointelegraph, and more.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://stablegazette.com/feed.xml" rel="self" type="application/rss+xml"/>
    ${articles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${article.link}</link>
      <guid isPermaLink="true">${article.link}</guid>
      <pubDate>${new Date(article.pubDate).toUTCString()}</pubDate>
      <source url="${article.link}">${article.source}</source>
      ${article.description ? `<description><![CDATA[${article.description}]]></description>` : ""}
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
