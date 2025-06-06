import express, { Request, Response } from 'express';

/**
 * Creates a health check router
 * @returns Express router with health check endpoint
 */
export function createHealthRouter() {
  const router = express.Router();

  /**
   * Health check endpoint 
   * Returns server status information
   */
  router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  return router;
}