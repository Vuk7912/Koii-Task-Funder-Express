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

  it('should set and get cache values', () => {
    const testKey = 'test_key';
    const testValue = { data: 'test_data' };

    const result = marketDataCache.set(testKey, testValue);
    expect(result).toBeTruthy();

    const retrievedValue = marketDataCache.get(testKey);
    expect(retrievedValue).toEqual(testValue);
  });

  it('should delete specific cache entries', () => {
    const testKey = 'delete_key';
    const testValue = { data: 'delete_data' };

    marketDataCache.set(testKey, testValue);
    const deletedCount = marketDataCache.del(testKey);

    expect(deletedCount).toBe(1);
    expect(marketDataCache.get(testKey)).toBeUndefined();
  });

  it('should flush entire cache', () => {
    const key1 = 'key1';
    const key2 = 'key2';

    marketDataCache.set(key1, { data: 'value1' });
    marketDataCache.set(key2, { data: 'value2' });
    marketDataCache.flush();

    expect(marketDataCache.get(key1)).toBeUndefined();
    expect(marketDataCache.get(key2)).toBeUndefined();
  });
});