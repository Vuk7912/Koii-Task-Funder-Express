import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types/error';

/**
 * Global error handling middleware
 * Handles different types of errors and sends appropriate response
 */
export const errorHandler = (
  err: Error | ApiError, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // Default error status and message
  let statusCode = 500;
  let errorResponse = {
    status: 'error',
    message: 'An unexpected error occurred',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  // Check if it's an ApiError with a specific status code
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errorResponse.message = err.message;
  }

  // Log the error for server-side tracking
  console.error(err);

  // Send error response
  res.status(statusCode).json(errorResponse);
};

/**
 * Utility function to wrap async route handlers
 * Catches any async errors and passes them to global error handler
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};