import { describe, expect, it } from 'vitest';
import { createCache, CacheConfig } from './cache';
import NodeCache from 'node-cache';

describe('Cache Configuration', () => {
  it('should create a cache with default configuration', () => {
    const cache = createCache();
    expect(cache).toBeInstanceOf(NodeCache);
  });

  it('should allow custom cache configuration', () => {
    const customConfig: CacheConfig = {
      stdTTL: 300,       // 5 minutes
      checkperiod: 60,   // 1 minute
      maxKeys: 500,
      useClones: false
    };

    const cache = createCache(customConfig);
    expect(cache.options.stdTTL).toBe(300);
    expect(cache.options.checkperiod).toBe(60);
    expect(cache.options.maxKeys).toBe(500);
    expect(cache.options.useClones).toBe(false);
  });

  it('should throw error for invalid stdTTL', () => {
    expect(() => createCache({ stdTTL: -1 })).toThrowError('stdTTL must be a non-negative number');
  });

  it('should throw error for invalid maxKeys', () => {
    expect(() => createCache({ maxKeys: 0 })).toThrowError('maxKeys must be a positive number');
  });

  it('should merge default and custom configurations', () => {
    const partialConfig: CacheConfig = {
      stdTTL: 300
    };

    const cache = createCache(partialConfig);
    expect(cache.options.stdTTL).toBe(300);
    expect(cache.options.checkperiod).toBe(120);
    expect(cache.options.maxKeys).toBe(1000);
  });
});