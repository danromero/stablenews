import { getStablecoinNews } from "@/lib/rss";
import { Article } from "@/types/article";

// Revalidate every 5 minutes on Vercel
export const revalidate = 300;

function formatDate(date: Date): string {
  return date.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
}

function ArticleItem({ article }: { article: Article }) {
  return (
    <article className="py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="text-xs text-gray-400 mb-1">
        {formatDate(article.pubDate)} | {article.source}
      </div>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[15px] leading-snug text-gray-900 hover:text-blue-700 hover:underline"
      >
        {article.title}
      </a>
    </article>
  );
}

export default async function Home() {
  const { articles, lastUpdated } = await getStablecoinNews(50);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <header className="mb-5 px-4">
          <img
            src="/logo.svg"
            alt="Stable Gazette"
            className="h-5"
          />
        </header>
        <main>
          {articles.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No stablecoin news found. Check back later.
            </p>
          ) : (
            <div className="space-y-1">
              {articles.map((article, index) => (
                <ArticleItem key={`${article.link}-${index}`} article={article} />
              ))}
            </div>
          )}
        </main>
        <p className="text-xs text-gray-300 mt-8 text-center">
          Last updated {formatDate(lastUpdated)}
        </p>
      </div>
    </div>
  );
}
