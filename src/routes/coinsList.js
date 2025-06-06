import mockCryptoPrices from '../data/crypto-prices.json';

/**
 * Retrieves the list of coins from mock cryptocurrency data
 * @returns {Array} List of coins with id, symbol, and name
 */
export function getCoinsList() {
  // Transform the object into an array of coins
  return Object.keys(mockCryptoPrices).map(key => ({
    id: mockCryptoPrices[key].id,
    symbol: mockCryptoPrices[key].symbol,
    name: mockCryptoPrices[key].name
  }));
}

/**
 * Express route handler for coins list endpoint
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 */
export function coinsListHandler(req, res) {
  try {
    const coinsList = getCoinsList();
    res.json(coinsList);
  } catch (error) {
    res.status(500).json({ 
      error: 'Unable to retrieve coins list', 
      details: error.message 
    });
  }
}