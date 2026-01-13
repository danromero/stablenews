import Parser from "rss-parser";
import { Article } from "@/types/article";
import { FeedSource, getEnabledFeeds } from "@/config/feeds";
import { containsStablecoinKeyword } from "@/config/keywords";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "StablecoinNewsAggregator/1.0",
  },
});

// Simple in-memory cache
interface CacheEntry {
  articles: Article[];
  timestamp: number;
}

let cache: CacheEntry | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function fetchFeed(feed: FeedSource): Promise<Article[]> {
  try {
    const response = await parser.parseURL(feed.url);

    return response.items.map((item) => ({
      title: item.title || "Untitled",
      link: item.link || "#",
      pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
      source: feed.name,
      description: item.contentSnippet || item.content || "",
    }));
  } catch (error) {
    console.error(`Error fetching feed ${feed.name}:`, error);
    return [];
  }
}

function filterStablecoinArticles(articles: Article[]): Article[] {
  return articles.filter((article) => {
    const textToCheck = `${article.title} ${article.description || ""}`;
    return containsStablecoinKeyword(textToCheck);
  });
}

function sortByDate(articles: Article[]): Article[] {
  return articles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

export async function getStablecoinNews(limit: number = 50): Promise<{
  articles: Article[];
  lastUpdated: Date;
}> {
  // Check cache
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return {
      articles: cache.articles.slice(0, limit),
      lastUpdated: new Date(cache.timestamp),
    };
  }

  const feeds = getEnabledFeeds();

  // Fetch all feeds in parallel
  const feedResults = await Promise.all(feeds.map(fetchFeed));

  // Combine all articles
  const allArticles = feedResults.flat();

  // Filter for stablecoin content
  const filteredArticles = filterStablecoinArticles(allArticles);

  // Sort by date (newest first)
  const sortedArticles = sortByDate(filteredArticles);

  // Update cache
  cache = {
    articles: sortedArticles,
    timestamp: Date.now(),
  };

  return {
    articles: sortedArticles.slice(0, limit),
    lastUpdated: new Date(),
  };
}
