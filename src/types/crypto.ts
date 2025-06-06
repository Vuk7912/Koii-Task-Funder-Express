/**
 * Represents an image object with different sizes for a cryptocurrency
 */
export interface CoinImage {
  thumb: string;
  small: string;
  large: string;
}

/**
 * Represents price and market cap data for different currencies
 */
export interface CurrencyValue {
  usd: number;
  eur: number;
  jpy: number;
}

/**
 * Represents links related to a cryptocurrency
 */
export interface CoinLinks {
  homepage: string[];
  blockchain_site: string[];
  official_forum_url: string[];
}

/**
 * Represents community engagement metrics
 */
export interface CommunityData {
  facebook_likes: number | null;
  twitter_followers: number;
  reddit_subscribers: number;
}

/**
 * Represents developer activity metrics
 */
export interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
  pull_requests_merged: number;
  commit_count_4_weeks: number;
}

/**
 * Represents market data for a cryptocurrency
 */
export interface MarketData {
  current_price: CurrencyValue;
  market_cap: CurrencyValue;
  total_volume: CurrencyValue;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
}

/**
 * Represents a comprehensive cryptocurrency object
 */
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  description: string;
  image: CoinImage;
  market_data: MarketData;
  links: CoinLinks;
  community_data: CommunityData;
  developer_data: DeveloperData;
}

/**
 * Represents the entire coins dataset
 */
export interface CoinDataset {
  coins: Coin[];
}