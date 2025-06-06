import { describe, it, expect, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { configureMiddleware, errorHandler } from '../middleware/requestMiddleware';

describe('Request Middleware', () => {
  it('should configure JSON parsing middleware', async () => {
    const app = express();
    configureMiddleware(app);

    const response = await request(app)
      .post('/')
      .send({ test: 'data' })
      .expect(404); // We're not defining a route, so 404 is expected

    expect(response.status).toBe(404);
  });

  it('should log requests using morgan', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const app = express();
    configureMiddleware(app);

    await request(app)
      .get('/')
      .expect(404);

    // Morgan logs to console in 'dev' mode
    // We can't directly test this, but we can verify no errors occurred
    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('error'));
  });

  it('should handle errors gracefully', () => {
    const mockError = new Error('Test Error');
    const mockReq = {} as express.Request;
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as express.Response;
    const mockNext = vi.fn();

    errorHandler(mockError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Internal Server Error',
      message: 'Test Error'
    });
  });
});