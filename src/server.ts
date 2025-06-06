import express, { Express, Request, Response } from 'express';
import http from 'http';

/**
 * Creates and configures an Express server for the CoinGecko Mock API
 * @returns {http.Server} HTTP Server instance
 */
export function createServer(): http.Server {
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

  // Create HTTP server
  const server = http.createServer(app);

  // Start server method
  server.start = function() {
    return this.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  };

  return server;
}

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const server = createServer();
  server.start();
}