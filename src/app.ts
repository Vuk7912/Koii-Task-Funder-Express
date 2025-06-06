import express, { Request, Response, NextFunction } from 'express';

// Mock coin data
const mockCoins = {
  bitcoin: {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    description: 'The first decentralized cryptocurrency',
    image: 'https://example.com/bitcoin.png',
    market_data: {
      current_price: { usd: 50000 },
      market_cap: { usd: 1000000000000 },
      price_change_percentage_24h: 2.5,
      price_change_percentage_7d: 5.0,
      price_change_percentage_30d: 10.0
    },
    links: {
      homepage: 'https://bitcoin.org'
    }
  },
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    description: 'Blockchain platform for smart contracts',
    image: 'https://example.com/ethereum.png',
    market_data: {
      current_price: { usd: 3000 },
      market_cap: { usd: 500000000000 },
      price_change_percentage_24h: 1.5,
      price_change_percentage_7d: 3.0,
      price_change_percentage_30d: 8.0
    },
    links: {
      homepage: 'https://ethereum.org'
    }
  }
};

export function createApp() {
  const app = express();

  // Middleware
  app.use(express.json());

  // Coin details endpoint
  app.get('/api/coins/:coinId', (req: Request, res: Response, next: NextFunction) => {
    const coinId = req.params.coinId.toLowerCase();

    // Validate coin id format (alphanumeric and lowercase)
    if (!/^[a-z0-9-]+$/.test(coinId)) {
      return res.status(400).json({ error: 'Invalid coin id format' });
    }

    // Find coin (case-insensitive)
    const coin = mockCoins[coinId];

    if (!coin) {
      return res.status(404).json({ error: 'Coin not found' });
    }

    res.json(coin);
  });

  // Global error handler
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}