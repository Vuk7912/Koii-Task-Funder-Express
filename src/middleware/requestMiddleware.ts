import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

/**
 * Configure middleware for request parsing and logging
 * @param app Express application instance
 */
export function configureMiddleware(app: Express): void {
  // JSON parsing middleware
  app.use(express.json());
  
  // URL-encoded body parsing middleware
  app.use(express.urlencoded({ extended: true }));

  // Morgan logging middleware
  // 'dev' format includes: HTTP method, URL, status code, response time, and color-coding
  app.use(morgan('dev'));
}

/**
 * Custom error handling middleware
 * @param err Error object
 * @param req Express request
 * @param res Express response
 * @param next Next middleware function
 */
export function errorHandler(
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void {
  console.error(`[ERROR] ${err.message}`);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
}