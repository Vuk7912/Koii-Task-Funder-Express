import express, { Request, Response } from 'express';
import MarketDataCache from '../services/market-data-cache';

const router = express.Router();
const marketDataCache = MarketDataCache.getInstance();

/**
 * Get market data for given coin IDs
 * Supports caching to improve performance
 */
router.get('/market-data', async (req: Request, res: Response) => {
  try {
    const { ids, vs_currencies } = req.query;

    // Validate input
    if (!ids || !vs_currencies) {
      return res.status(400).json({ 
        error: 'Missing required parameters: ids, vs_currencies' 
      });
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

    // Cache the result
    marketDataCache.set(cacheKey, marketData);

    res.json(marketData);
  } catch (error) {
    console.error('Market data retrieval error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;