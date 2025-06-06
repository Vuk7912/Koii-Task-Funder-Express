import mockCryptoPrices from '../data/crypto-prices.json' assert { type: 'json' };

/**
 * Retrieves the list of coins from mock cryptocurrency data
 * @returns {Array} List of coins with id, symbol, and name
 */
export function getCoinsList() {
  // Return a copy of the mock data to prevent direct mutation
  return mockCryptoPrices.map(coin => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name
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