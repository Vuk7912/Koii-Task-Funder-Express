import { Request, Response, NextFunction } from 'express';

/**
 * Custom error types for market-related errors
 */
export class MarketError extends Error {
  statusCode: number;
  originalType?: string;

  constructor(message: string, statusCode: number = 500, originalType?: string) {
    super(message);
    this.name = originalType || 'MarketError';
    this.statusCode = statusCode;
    this.originalType = originalType;
  }
}

/**
 * Specific error types
 */
export class InvalidParameterError extends MarketError {
  constructor(message: string) {
    super(message, 400, 'InvalidParameterError');
  }
}

export class ResourceNotFoundError extends MarketError {
  constructor(message: string) {
    super(message, 404, 'ResourceNotFoundError');
  }
}

export class RateLimitError extends MarketError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RateLimitError');
  }
}

/**
 * Market endpoint error handling middleware
 * Provides structured error responses for different market-related scenarios
 */
export const marketErrorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error(`[Market Error] ${err.message}`);

  // Handle specific market error types
  if (err instanceof MarketError) {
    return res.status(err.statusCode).json({
      error: true,
      type: err.originalType || err.name,
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }

  // Handle unexpected errors
  res.status(500).json({
    error: true,
    type: 'UnexpectedError',
    message: 'An unexpected error occurred in the market data service',
    timestamp: new Date().toISOString()
  });
};