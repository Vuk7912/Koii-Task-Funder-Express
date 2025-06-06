import NodeCache from 'node-cache';

/**
 * Cache configuration interface defining customizable options
 */
export interface CacheConfig {
  stdTTL?: number;       // Standard time to live in seconds
  checkperiod?: number;  // Period in seconds to check and delete expired keys
  maxKeys?: number;      // Maximum number of keys to store
  useClones?: boolean;   // Whether to clone stored objects
}

/**
 * Default cache configuration
 */
const DEFAULT_CACHE_CONFIG: CacheConfig = {
  stdTTL: 600,           // 10 minutes default TTL
  checkperiod: 120,      // Check for expired keys every 2 minutes
  maxKeys: 1000,         // Maximum 1000 keys
  useClones: true        // Clone objects to prevent direct mutations
};

/**
 * Create a configured cache instance
 * @param customConfig Optional custom configuration to override defaults
 * @returns Configured NodeCache instance
 */
export function createCache(customConfig: CacheConfig = {}): NodeCache {
  // Merge default and custom configurations
  const config: CacheConfig = { 
    ...DEFAULT_CACHE_CONFIG, 
    ...customConfig 
  };

  // Validate configuration
  if (config.stdTTL && config.stdTTL < 0) {
    throw new Error('stdTTL must be a non-negative number');
  }

  if (config.maxKeys !== undefined && config.maxKeys <= 0) {
    throw new Error('maxKeys must be a positive number');
  }

  return new NodeCache({
    stdTTL: config.stdTTL,
    checkperiod: config.checkperiod,
    maxKeys: config.maxKeys,
    useClones: config.useClones
  });
}

// Export a default cache instance with default configuration
export const defaultCache = createCache();