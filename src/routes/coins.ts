import { Request, Response } from 'express';
import cryptoPrices from '../data/crypto-prices.json';

/**
 * Handles the GET request for retrieving the list of cryptocurrencies
 * @param req Express request object
 * @param res Express response object
 */
export const getCoinsList = (req: Request, res: Response) => {
  try {
    // Extract optional query parameters
    const { order = 'market_cap_desc', per_page = 100, page = 1 } = req.query;

    // Validate and parse pagination parameters
    const pageNum = Math.max(1, Number(page));
    const perPageNum = Math.min(Math.max(1, Number(per_page)), 250);
    const startIndex = (pageNum - 1) * perPageNum;
    const endIndex = startIndex + perPageNum;

    // Sort coins based on market cap (descending by default)
    const sortedCoins = cryptoPrices.sort((a, b) => 
      order === 'market_cap_desc' ? b.market_cap - a.market_cap : a.market_cap - b.market_cap
    );

    // Paginate the results
    const paginatedCoins = sortedCoins.slice(startIndex, endIndex);

    res.json(paginatedCoins);
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Unable to retrieve coins list' 
    });
  }
};