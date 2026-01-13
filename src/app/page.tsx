import { getStablecoinNews } from "@/lib/rss";
import NewsFeed from "@/components/NewsFeed";
import ThemeToggle from "@/components/ThemeToggle";

// Revalidate every 5 minutes on Vercel
export const revalidate = 300;

export default async function Home() {
  const { articles, lastUpdated } = await getStablecoinNews(50);

  // Get unique sources
  const sources = [...new Set(articles.map(a => a.source))].sort();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Accent line */}
      <div className="h-px bg-gray-200 dark:bg-gray-800" />

      <div className="max-w-3xl mx-auto px-4 py-6">
        <header className="mb-5 px-4 flex items-center justify-between">
          <a href="/" className="hover:opacity-70 transition-opacity">
            <img
              src="/logo.svg"
              alt="Stable Gazette"
              className="h-5 dark:invert"
            />
          </a>
          <div className="flex items-center gap-2">
            <a
              href="/feed.xml"
              className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              title="RSS Feed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </a>
            <ThemeToggle />
          </div>
        </header>

        <main>
          {articles.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No stablecoin news found. Check back later.
            </p>
          ) : (
            <NewsFeed
              initialArticles={articles}
              sources={sources}
              lastUpdated={lastUpdated}
            />
          )}
        </main>
      </div>
    </div>
  );
}
