import NodeCache from 'node-cache';

/**
 * Caching service for market data
 * Provides methods to get, set, and invalidate cached market data
 */
class MarketDataCache {
  private cache: NodeCache;
  private static instance: MarketDataCache;

  private constructor() {
    // Initialize cache with 15-minute default TTL
    this.cache = new NodeCache({ 
      stdTTL: 900, // 15 minutes 
      checkperiod: 960 // slightly longer than TTL to allow cleanup
    });
  }

  /**
   * Singleton pattern to ensure single cache instance
   * @returns {MarketDataCache} Singleton instance
   */
  public static getInstance(): MarketDataCache {
    if (!MarketDataCache.instance) {
      MarketDataCache.instance = new MarketDataCache();
    }
    return MarketDataCache.instance;
  }

  /**
   * Get cached market data
   * @param {string} key - Unique cache key
   * @returns {any} Cached data or undefined
   */
  public get<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  /**
   * Set market data in cache
   * @param {string} key - Unique cache key 
   * @param {T} value - Market data to cache
   * @param {number} [ttl] - Optional time to live in seconds
   */
  public set<T>(key: string, value: T, ttl?: number): boolean {
    if (ttl === undefined) {
      return this.cache.set(key, value);
    }
    return this.cache.set(key, value, ttl);
  }

  /**
   * Delete specific cache entry
   * @param {string} key - Cache key to delete
   * @returns {number} Number of entries deleted
   */
  public del(key: string): number {
    return this.cache.del(key);
  }

  /**
   * Clear entire cache
   */
  public flush(): void {
    this.cache.flushAll();
  }
}

export default MarketDataCache;