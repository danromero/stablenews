# Stablecoin News

A Techmeme-style news aggregator that displays stablecoin-specific news from crypto RSS feeds.

## Features

- Aggregates news from multiple crypto RSS feeds
- Filters articles for stablecoin relevance using keyword matching
- Displays articles in reverse-chronological order
- Minimal, text-heavy design (Hacker News / Techmeme style)
- Built with Next.js Server Components for fast loading
- Simple in-memory caching (5 minute TTL)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd stablenews
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Adding New RSS Feeds

Edit `src/config/feeds.ts` to add or enable feeds:

```typescript
{
  name: "Source Name",
  url: "https://example.com/feed",
  enabled: true,  // Set to true to enable
}
```

### Updating Stablecoin Keywords

Edit `src/config/keywords.ts` to add new keywords for filtering:

```typescript
export const STABLECOIN_KEYWORDS = {
  core: ["stablecoin", ...],
  tickers: ["USDT", "USDC", ...],
  companies: ["Tether", "Circle", ...],
  related: ["algorithmic stablecoin", ...],
};
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page component
├── config/
│   ├── feeds.ts         # RSS feed configuration
│   └── keywords.ts      # Stablecoin keyword filters
├── lib/
│   └── rss.ts           # RSS fetching and filtering logic
└── types/
    └── article.ts       # TypeScript types
```

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- rss-parser

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/stablenews)

Or deploy manually:

```bash
npm run build
vercel deploy
```

## Current Feed Sources

Active:
- CoinDesk
- Cointelegraph

Additional feeds available (disabled by default):
- Crypto.news
- NewsBTC
- Blockchain.News
- CryptoNews
- CryptoPotato
- CryptoSlate
- The Defiant
- CryptoBreaking

## License

MIT
