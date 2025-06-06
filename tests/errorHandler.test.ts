import { describe, it, expect, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { errorHandler, asyncHandler } from '../src/middleware/errorHandler';
import { ApiError, ValidationError, NotFoundError, InternalServerError } from '../src/types/error';
import { Request, Response, NextFunction } from 'express';

describe('Error Handling Middleware', () => {
  describe('errorHandler', () => {
    const createMockResponse = () => {
      return {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis()
      } as unknown as Response;
    };

    it('should handle ApiError with correct status and message', () => {
      const err = new ValidationError('Invalid input');
      const req = {} as Request;
      const res = createMockResponse();
      const next = vi.fn() as NextFunction;

      errorHandler(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        status: 'error',
        message: 'Invalid input'
      }));
    });

    it('should handle generic errors with 500 status', () => {
      const err = new Error('Generic error');
      const req = {} as Request;
      const res = createMockResponse();
      const next = vi.fn() as NextFunction;

      errorHandler(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        status: 'error',
        message: 'An unexpected error occurred'
      }));
    });
  });

  describe('asyncHandler', () => {
    it('should catch and forward async errors', async () => {
      const app = express();
      
      // Set up route with asyncHandler and error handling middleware
      app.get('/test', 
        asyncHandler(async () => {
          throw new NotFoundError('Resource not found');
        })
      );

      // Add global error handling middleware
      app.use(errorHandler);

      const response = await request(app).get('/test');
      
      expect(response.status).toBe(404);
      expect(response.body).toEqual(expect.objectContaining({
        status: 'error',
        message: 'Resource not found'
      }));
    });
  });
});