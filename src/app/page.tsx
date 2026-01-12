import { getStablecoinNews } from "@/lib/rss";
import { Article } from "@/types/article";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatLastUpdated(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function ArticleItem({ article }: { article: Article }) {
  return (
    <article className="py-2">
      <div className="text-xs text-gray-500 mb-0.5">
        [{formatDate(article.pubDate)}]
      </div>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[15px] leading-snug text-gray-900 hover:text-blue-700 hover:underline"
      >
        {article.title}
      </a>
      <div className="text-xs text-gray-400 mt-0.5">{article.source}</div>
    </article>
  );
}

export default async function Home() {
  const { articles, lastUpdated } = await getStablecoinNews(50);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Stablecoin News
          </h1>
          <p className="text-sm text-gray-500">
            Latest news about stablecoins from across the crypto web
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Last updated: {formatLastUpdated(lastUpdated)}
          </p>
        </header>

        <main>
          {articles.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No stablecoin news found. Check back later.
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {articles.map((article, index) => (
                <ArticleItem key={`${article.link}-${index}`} article={article} />
              ))}
            </div>
          )}
        </main>

        <footer className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-400">
          <p>
            Aggregating stablecoin news from CoinDesk, Cointelegraph, and more.
          </p>
        </footer>
      </div>
    </div>
  );
}
