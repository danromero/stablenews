// Stablecoin-related keywords for filtering articles
// Add or remove keywords as needed

export const STABLECOIN_KEYWORDS = {
  // Core stablecoin terms
  core: [
    "stablecoin",
    "stablecoins",
  ],

  // Specific stablecoin tickers
  tickers: [
    "USDT",
    "USDC",
    "DAI",
    "BUSD",
    "TUSD",
    "FDUSD",
    "PYUSD",
    "USDe",
    "USDD",
  ],

  // Company/project names
  companies: [
    "Tether",
    "Circle",
    "Paxos",
    "MakerDAO",
    "PayPal USD",
  ],

  // Related terms
  related: [
    "algorithmic stablecoin",
    "fiat-backed",
    "crypto-backed",
  ],
};

// Flatten all keywords into a single array for matching
export const getAllKeywords = (): string[] => {
  return [
    ...STABLECOIN_KEYWORDS.core,
    ...STABLECOIN_KEYWORDS.tickers,
    ...STABLECOIN_KEYWORDS.companies,
    ...STABLECOIN_KEYWORDS.related,
  ];
};

// Check if text contains any stablecoin keyword (case-insensitive)
export const containsStablecoinKeyword = (text: string): boolean => {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  return getAllKeywords().some((keyword) =>
    lowerText.includes(keyword.toLowerCase())
  );
};
