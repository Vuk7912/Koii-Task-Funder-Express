import { Request, Response } from 'express';
import { mockMarketData } from '../mocks/market-data';
import { MarketData } from '../types/market-data';

/**
 * Fetch market data for multiple cryptocurrencies
 * @param req Express request object
 * @param res Express response object
 */
export const getMarketData = (req: Request, res: Response) => {
  try {
    // Extract coin IDs from query parameter
    const { ids } = req.query;

    // Validate input
    if (!ids || typeof ids !== 'string') {
      return res.status(400).json({
        error: 'Invalid input: Please provide comma-separated coin IDs'
      });
    }

    // Split comma-separated IDs
    const coinIds = ids.toString().toLowerCase().split(',');

    // Validate coin IDs
    if (coinIds.length === 0) {
      return res.status(400).json({
        error: 'No coin IDs provided'
      });
    }

    // Retrieve market data for requested coins
    const marketData: MarketData[] = coinIds
      .map(id => mockMarketData[id.trim()])
      .filter(Boolean); // Remove undefined entries

    // Check if any valid coins were found
    if (marketData.length === 0) {
      return res.status(404).json({
        error: 'No market data found for the provided coin IDs'
      });
    }

    // Return market data
    res.json(marketData);
  } catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).json({
      error: 'Internal server error while fetching market data'
    });
  }
};