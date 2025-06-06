import { describe, it, expect, vi } from 'vitest';
import { validateRequest, coinListSchema, coinDetailsSchema, marketDataSchema } from '../src/middleware/validation';
import { Request, Response, NextFunction } from 'express';

describe('Input Validation Middleware', () => {
  // Mock Express objects
  const createMockRequest = (data: any) => ({
    body: data.body || {},
    params: data.params || {},
    query: data.query || {}
  }) as Request;

  const createMockResponse = () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    return res;
  };

  const mockNext = vi.fn() as NextFunction;

  describe('Coin List Validation', () => {
    it('should validate coin list query parameters correctly', () => {
      const req = createMockRequest({
        query: { page: '2', limit: '50', order: 'market_cap_desc' }
      });
      const res = createMockResponse();

      const middleware = validateRequest(coinListSchema);
      middleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(req.validatedData).toEqual({
        body: {},
        params: {},
        query: { page: 2, limit: 50, order: 'market_cap_desc' }
      });
    });

    it('should use default values when query parameters are not provided', () => {
      const req = createMockRequest({});
      const res = createMockResponse();

      const middleware = validateRequest(coinListSchema);
      middleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(req.validatedData).toEqual({
        body: {},
        params: {},
        query: { page: 1, limit: 100, order: 'market_cap_desc' }
      });
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate coin details request', () => {
      const req = createMockRequest({
        params: { coinId: 'bitcoin' },
        query: { localization: 'true', market_data: 'true' }
      });
      const res = createMockResponse();

      const middleware = validateRequest(coinDetailsSchema);
      middleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(req.validatedData).toEqual({
        body: {},
        params: { coinId: 'bitcoin' },
        query: { localization: true, market_data: true }
      });
    });

    it('should return 400 for invalid coin details request', () => {
      const req = createMockRequest({
        params: { coinId: '' }
      });
      const res = createMockResponse();

      const middleware = validateRequest(coinDetailsSchema);
      middleware(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: 'Validation Failed'
      }));
    });
  });

  describe('Market Data Validation', () => {
    it('should validate market data query parameters', () => {
      const req = createMockRequest({
        query: { 
          vs_currency: 'usd', 
          ids: 'bitcoin,ethereum', 
          page: '2', 
          sparkline: 'true' 
        }
      });
      const res = createMockResponse();

      const middleware = validateRequest(marketDataSchema);
      middleware(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith();
      expect(req.validatedData).toEqual({
        body: {},
        params: {},
        query: { 
          vs_currency: 'usd', 
          ids: ['bitcoin', 'ethereum'], 
          page: 2, 
          per_page: 100, 
          order: 'market_cap_desc', 
          sparkline: true 
        }
      });
    });
  });
});