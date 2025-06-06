import { describe, it, expect } from 'vitest';
import { Request, Response } from 'express';
import { getMarketData } from '../market-data';

describe('Market Data Route', () => {
  it('should return market data for valid coin IDs', () => {
    const mockReq = {
      query: { ids: 'bitcoin,ethereum' }
    } as unknown as Request;

    const mockRes = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis()
    } as unknown as Response;

    getMarketData(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: 'bitcoin' }),
        expect.objectContaining({ id: 'ethereum' })
      ])
    );
  });

  it('should return 400 error for missing coin IDs', () => {
    const mockReq = {
      query: {}
    } as unknown as Request;

    const mockRes = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis()
    } as unknown as Response;

    getMarketData(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });

  it('should return 404 for non-existent coin IDs', () => {
    const mockReq = {
      query: { ids: 'nonexistent' }
    } as unknown as Request;

    const mockRes = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis()
    } as unknown as Response;

    getMarketData(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });
});