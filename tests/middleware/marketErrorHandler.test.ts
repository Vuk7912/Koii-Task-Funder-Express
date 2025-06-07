import { describe, it, expect, vi } from 'vitest';
import { 
  MarketError, 
  InvalidParameterError, 
  ResourceNotFoundError, 
  RateLimitError, 
  marketErrorHandler 
} from '../../src/middleware/marketErrorHandler';
import { Request, Response, NextFunction } from 'express';

describe('Market Error Handler', () => {
  // Test custom error classes
  it('should create MarketError with correct properties', () => {
    const error = new MarketError('Test error', 400);
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(400);
    expect(error.name).toBe('MarketError');
  });

  it('should create InvalidParameterError with 400 status', () => {
    const error = new InvalidParameterError('Invalid parameter');
    expect(error.statusCode).toBe(400);
  });

  it('should create ResourceNotFoundError with 404 status', () => {
    const error = new ResourceNotFoundError('Resource not found');
    expect(error.statusCode).toBe(404);
  });

  it('should create RateLimitError with 429 status', () => {
    const error = new RateLimitError();
    expect(error.statusCode).toBe(429);
  });

  // Test error handling middleware
  it('should handle MarketError correctly', () => {
    const mockError = new InvalidParameterError('Invalid coin ID');
    const mockReq = {} as Request;
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const mockNext = vi.fn() as NextFunction;

    marketErrorHandler(mockError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      error: true,
      type: 'InvalidParameterError',
      message: 'Invalid coin ID'
    }));
  });

  it('should handle unexpected errors with 500 status', () => {
    const mockError = new Error('Unexpected error');
    const mockReq = {} as Request;
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const mockNext = vi.fn() as NextFunction;

    marketErrorHandler(mockError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      error: true,
      type: 'UnexpectedError'
    }));
  });
});