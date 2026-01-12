export interface FeedSource {
  name: string;
  url: string;
  enabled: boolean;
}

// Active RSS feed sources - add new feeds here
export const FEED_SOURCES: FeedSource[] = [
  // Initial feeds (MVP)
  {
    name: "CoinDesk",
    url: "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml",
    enabled: true,
  },
  {
    name: "Cointelegraph",
    url: "https://cointelegraph.com/rss",
    enabled: true,
  },
  // Additional feeds to enable later
  {
    name: "Crypto.news",
    url: "https://crypto.news/feed",
    enabled: false,
  },
  {
    name: "NewsBTC",
    url: "https://newsbtc.com/feed",
    enabled: false,
  },
  {
    name: "Blockchain.News",
    url: "https://blockchain.news/rss",
    enabled: false,
  },
  {
    name: "CryptoNews",
    url: "https://cryptonews.com/news/feed",
    enabled: false,
  },
  {
    name: "CryptoPotato",
    url: "https://cryptopotato.com/feed",
    enabled: false,
  },
  {
    name: "CryptoSlate",
    url: "https://cryptoslate.com/feed",
    enabled: false,
  },
  {
    name: "The Defiant",
    url: "https://thedefiant.io/feed/",
    enabled: false,
  },
  {
    name: "CryptoBreaking",
    url: "https://cryptobreaking.com/feed",
    enabled: false,
  },
];

// Get only enabled feeds
export const getEnabledFeeds = (): FeedSource[] => {
  return FEED_SOURCES.filter((feed) => feed.enabled);
};
