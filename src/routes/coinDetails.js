import express from 'express';
import NodeCache from 'node-cache';

// Mock coin data (in a real app, this would come from a database or service)
const mockCoins = {
  'bitcoin': {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    description: 'The first decentralized cryptocurrency',
    price: 50000
  },
  'ethereum': {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    description: 'Blockchain platform with smart contract functionality',
    price: 3000
  }
};

// Create a cache instance
const coinCache = new NodeCache({ stdTTL: 600 }); // 10 minutes cache

/**
 * Validate coin ID input
 * @param {string} coinId - The ID of the coin to validate
 * @throws {Error} If coin ID is invalid
 */
function validateCoinId(coinId) {
  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
    throw new Error('Coin ID is required');
  }
}

/**
 * Error handler middleware for coin details route
 * @param {Error} err - The error object
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
function coinDetailsErrorHandler(err, req, res, next) {
  console.error(`Coin Details Error: ${err.message}`);
  
  switch (err.message) {
    case 'Coin ID is required':
      return res.status(404).json({
        error: 'Not Found',
        message: 'Coin ID is required',
        status: 404
      });
    
    case 'Coin not found':
      return res.status(404).json({
        error: 'Not Found',
        message: 'Cryptocurrency not found',
        status: 404
      });
    
    default:
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
        status: 500
      });
  }
}

/**
 * Get coin details by ID
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
function getCoinDetails(req, res, next) {
  try {
    const coinId = req.params.coinId;
    
    // Check if coinId is undefined or empty
    if (!coinId) {
      throw new Error('Coin ID is required');
    }
    
    // Validate input
    validateCoinId(coinId);
    
    const normalizedCoinId = coinId.toLowerCase();
    
    // Check cache first
    const cachedCoin = coinCache.get(normalizedCoinId);
    if (cachedCoin) {
      return res.json(cachedCoin);
    }
    
    // Find coin in mock data
    const coin = mockCoins[normalizedCoinId];
    
    if (!coin) {
      throw new Error('Coin not found');
    }
    
    // Cache the result
    coinCache.set(normalizedCoinId, coin);
    
    res.json(coin);
  } catch (error) {
    next(error);
  }
}

const coinDetailsRouter = express.Router();
coinDetailsRouter.get('/:coinId', getCoinDetails);
coinDetailsRouter.use(coinDetailsErrorHandler);

export default coinDetailsRouter;