import { Request, Response, NextFunction } from 'express';
import { CoinError } from '../errors/coin-error';

/**
 * Global error handling middleware for the CoinGecko mock API
 * @param err Error object
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error('Error occurred:', err);

  // Handle custom CoinError instances
  if (err instanceof CoinError) {
    return res.status(err.statusCode).json(err.toResponseObject());
  }

  // Handle other unexpected errors
  const genericError = new CoinError(
    err.message || 'An unexpected error occurred', 
    500, 
    'INTERNAL_SERVER_ERROR'
  );

  res.status(genericError.statusCode).json(genericError.toResponseObject());
};