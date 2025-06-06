import { describe, it, expect } from 'vitest';
import { InputValidationMiddleware } from '../src/middleware/validateInput';
import { Request, Response, NextFunction } from 'express';

describe('Input Validation Middleware', () => {
  const mockNext: NextFunction = () => {};

  describe('validateCoinListParams', () => {
    it('should allow valid parameters', () => {
      const req = {
        query: {
          order: 'market_cap_desc',
          per_page: '50',
          page: '1'
        }
      } as Request;
      const res = {
        status: () => ({ json: () => {} })
      } as unknown as Response;

      const spy = vi.spyOn(res, 'status');
      InputValidationMiddleware.validateCoinListParams(req, res, mockNext);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should reject invalid per_page values', () => {
      const req = {
        query: {
          per_page: '300'
        }
      } as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      } as unknown as Response;

      InputValidationMiddleware.validateCoinListParams(req, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(String)
      }));
    });

    it('should reject negative page values', () => {
      const req = {
        query: {
          page: '-1'
        }
      } as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      } as unknown as Response;

      InputValidationMiddleware.validateCoinListParams(req, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('validateCoinDetailsParams', () => {
    it('should allow valid coin ID', () => {
      const req = {
        params: {
          id: 'bitcoin'
        }
      } as Request;
      const res = {
        status: () => ({ json: () => {} })
      } as unknown as Response;

      const spy = vi.spyOn(res, 'status');
      InputValidationMiddleware.validateCoinDetailsParams(req, res, mockNext);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should reject empty coin ID', () => {
      const req = {
        params: {
          id: ''
        }
      } as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      } as unknown as Response;

      InputValidationMiddleware.validateCoinDetailsParams(req, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('validateMarketDataParams', () => {
    it('should allow valid market data parameters', () => {
      const req = {
        query: {
          vs_currency: 'usd',
          ids: 'bitcoin,ethereum',
          order: 'market_cap_desc',
          per_page: '50',
          page: '1',
          price_change_percentage: '24h,7d'
        }
      } as Request;
      const res = {
        status: () => ({ json: () => {} })
      } as unknown as Response;

      const spy = vi.spyOn(res, 'status');
      InputValidationMiddleware.validateMarketDataParams(req, res, mockNext);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should reject missing vs_currency', () => {
      const req = {
        query: {}
      } as Request;
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
      } as unknown as Response;

      InputValidationMiddleware.validateMarketDataParams(req, res, mockNext);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });
});