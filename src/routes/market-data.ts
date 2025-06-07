import express, { Request, Response, NextFunction } from 'express';
import MarketDataCache from '../services/market-data-cache';
import { 
  MarketError, 
  InvalidParameterError, 
  ResourceNotFoundError 
} from '../middleware/marketErrorHandler';

const router = express.Router();
const marketDataCache = MarketDataCache.getInstance();

/**
 * Get market data for given coin IDs
 * Supports caching to improve performance
 * Enhanced with more robust error handling
 */
router.get('/market-data', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids, vs_currencies } = req.query;

    // Enhanced input validation using custom error types
    if (!ids) {
      throw new InvalidParameterError('Missing required parameter: ids');
    }
    if (!vs_currencies) {
      throw new InvalidParameterError('Missing required parameter: vs_currencies');
    }

    // Create a unique cache key based on input
    const cacheKey = `market_data:${ids}:${vs_currencies}`;

    // Check cache first
    const cachedData = marketDataCache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // Simulate market data retrieval (replace with actual implementation)
    const marketData = {
      [ids as string]: {
        [vs_currencies as string]: Math.random() * 1000
      }
    };

    // Validate retrieved data
    if (Object.keys(marketData).length === 0) {
      throw new ResourceNotFoundError(`No market data found for ids: ${ids}`);
    }

    // Cache the result
    marketDataCache.set(cacheKey, marketData);

    res.json(marketData);
  } catch (error) {
    // Forward to centralized error handler
    next(error);
  }
});

export default router;