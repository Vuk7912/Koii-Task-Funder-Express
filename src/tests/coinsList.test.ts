import { describe, it, expect } from 'vitest';
import { getCoinsList } from '../services/coinsService';
import { CoinListItem } from '../types/coin';

describe('Coins List Endpoint', () => {
  it('should return a list of coins', async () => {
    const coinsList = await getCoinsList();
    
    // Verify basic structure
    expect(Array.isArray(coinsList)).toBe(true);
    expect(coinsList.length).toBeGreaterThan(0);
  });

  it('should have correct coin list item structure', async () => {
    const coinsList = await getCoinsList();
    const firstCoin = coinsList[0];

    // Verify each coin has required properties
    expect(firstCoin).toHaveProperty('id');
    expect(firstCoin).toHaveProperty('symbol');
    expect(firstCoin).toHaveProperty('name');
  });

  it('should filter coins correctly when limit is provided', async () => {
    const limitedCoinsList = await getCoinsList(10);
    
    expect(limitedCoinsList.length).toBe(10);
  });

  it('should handle empty or invalid limit', async () => {
    const defaultCoinsList = await getCoinsList(0);
    const defaultCoinsList2 = await getCoinsList(-5);
    
    expect(defaultCoinsList.length).toBeGreaterThan(0);
    expect(defaultCoinsList2.length).toBeGreaterThan(0);
  });

  it('should return coins sorted by market cap by default', async () => {
    const coinsList = await getCoinsList();
    
    // Check if list is sorted in descending order of market cap
    for (let i = 1; i < coinsList.length; i++) {
      expect(coinsList[i-1].market_cap).toBeGreaterThanOrEqual(coinsList[i].market_cap);
    }
  });
});