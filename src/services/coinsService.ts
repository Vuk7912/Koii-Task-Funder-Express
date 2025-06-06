import { CoinListItem } from '../types/coin';

// Mock data generator for coins list
function generateMockCoins(count: number): CoinListItem[] {
  const coins: CoinListItem[] = [];
  const baseMarketCap = 1000000000;  // Starting market cap

  for (let i = 0; i < count; i++) {
    const coin: CoinListItem = {
      id: `coin-${i}`,
      symbol: `SYM${i}`,
      name: `Coin ${i}`,
      image: `https://example.com/coin-${i}.png`,
      current_price: 100 - i,
      market_cap: baseMarketCap / (i + 1),
      market_cap_rank: i + 1,
      total_volume: baseMarketCap / (i + 2),
      high_24h: 110 - i,
      low_24h: 90 - i,
      price_change_24h: i - 5,
      price_change_percentage_24h: (i - 5) / 100,
      market_cap_change_24h: baseMarketCap / (i + 3),
      market_cap_change_percentage_24h: 0.5,
      circulating_supply: baseMarketCap / (100 - i),
      ath: 150 - i,
      ath_change_percentage: 10,
      ath_date: new Date().toISOString(),
      atl: 50 - i,
      atl_change_percentage: -10,
      atl_date: new Date().toISOString(),
      last_updated: new Date().toISOString()
    };
    coins.push(coin);
  }

  return coins.sort((a, b) => b.market_cap - a.market_cap);
}

/**
 * Retrieve a list of coins with optional limit
 * @param limit Number of coins to return (defaults to 250)
 * @returns Array of CoinListItem
 */
export async function getCoinsList(limit = 250): Promise<CoinListItem[]> {
  // Validate and normalize limit
  const normalizedLimit = limit > 0 ? limit : 250;
  
  // Generate mock coins data
  const allCoins = generateMockCoins(normalizedLimit);
  
  // Return limited list
  return allCoins.slice(0, normalizedLimit);
}