import { describe, it, expect, beforeEach } from 'vitest';
import MarketDataCache from '../services/market-data-cache';

describe('MarketDataCache', () => {
  let marketDataCache: MarketDataCache;

  beforeEach(() => {
    // Reset singleton instance before each test
    marketDataCache = MarketDataCache.getInstance();
    marketDataCache.flush();
  });

  it('should create a singleton instance', () => {
    const anotherInstance = MarketDataCache.getInstance();
    expect(marketDataCache).toBe(anotherInstance);
  });

  it('should set and get cache data', () => {
    const key = 'test_key';
    const value = { bitcoin: 50000 };

    marketDataCache.set(key, value);
    const cachedData = marketDataCache.get(key);

    expect(cachedData).toEqual(value);
  });

  it('should delete specific cache entry', () => {
    const key = 'delete_key';
    const value = { ethereum: 3000 };

    marketDataCache.set(key, value);
    const deletedCount = marketDataCache.del(key);
    const cachedData = marketDataCache.get(key);

    expect(deletedCount).toBe(1);
    expect(cachedData).toBeUndefined();
  });

  it('should flush entire cache', () => {
    marketDataCache.set('key1', { data: 1 });
    marketDataCache.set('key2', { data: 2 });

    marketDataCache.flush();

    expect(marketDataCache.get('key1')).toBeUndefined();
    expect(marketDataCache.get('key2')).toBeUndefined();
  });
});