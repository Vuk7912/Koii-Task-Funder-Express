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
    const { 
      order = 'market_cap_desc', 
      per_page = 100, 
      page = 1,
      // Support additional filtering options
      search,
      // Support sorting by different attributes
      sort_by = 'market_cap'
    } = req.query;

    // Validate and parse pagination parameters
    const pageNum = Math.max(1, Number(page));
    const perPageNum = Math.min(Math.max(1, Number(per_page)), 250);
    const startIndex = (pageNum - 1) * perPageNum;
    const endIndex = startIndex + perPageNum;

    // Filter coins if search parameter is provided
    let filteredCoins = search 
      ? cryptoPrices.filter(coin => 
          coin.name.toLowerCase().includes((search as string).toLowerCase()) || 
          coin.symbol.toLowerCase().includes((search as string).toLowerCase())
        )
      : cryptoPrices;

    // Sort coins based on the specified attribute and order
    const sortedCoins = filteredCoins.sort((a, b) => {
      const sortMultiplier = order === 'desc' ? -1 : 1;
      
      switch (sort_by) {
        case 'market_cap':
          return sortMultiplier * (b.market_cap - a.market_cap);
        case 'price':
          return sortMultiplier * (b.current_price - a.current_price);
        case 'name':
          return sortMultiplier * a.name.localeCompare(b.name);
        default:
          return sortMultiplier * (b.market_cap - a.market_cap);
      }
    });

    // Paginate the results
    const paginatedCoins = sortedCoins.slice(startIndex, endIndex);

    res.json({
      coins: paginatedCoins,
      page: pageNum,
      per_page: perPageNum,
      total_pages: Math.ceil(filteredCoins.length / perPageNum),
      total_coins: filteredCoins.length
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Unable to retrieve coins list',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};