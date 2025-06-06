import express from 'express';

export const app = express();

// Market data route
app.get('/api/markets', (req, res) => {
  const { ids } = req.query;

  if (!ids) {
    return res.status(400).json({ error: 'Coin IDs are required' });
  }

  const coinIds = (ids as string).split(',');

  // Mock market data
  const mockMarketData = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      current_price: 50000,
      market_cap: 1000000000000,
      total_volume: 50000000000,
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      current_price: 3000,
      market_cap: 500000000000,
      total_volume: 25000000000,
    }
  ];

  // Filter mock data based on requested coin ids
  const filteredData = mockMarketData.filter(coin => 
    coinIds.includes(coin.id)
  );

  if (filteredData.length === 0) {
    return res.status(404).json({ error: 'No market data found for provided coin ids' });
  }

  res.json(filteredData);
});