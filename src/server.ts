import express, { Express, Request, Response } from 'express';

/**
 * Creates and configures an Express server for the CoinGecko Mock API
 * @returns {Express} Configured Express application
 */
export function createServer(): Express {
  const app: Express = express();
  const PORT: number = parseInt(process.env.PORT || '3000', 10);

  // Basic middleware
  app.use(express.json());

  // Health check endpoint
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'healthy',
      message: 'CoinGecko Mock API is running',
      timestamp: new Date().toISOString()
    });
  });

  // Start server method
  function start() {
    return app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

  return { ...app, start };
}

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const server = createServer();
  server.start();
}