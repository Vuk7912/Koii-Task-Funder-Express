import { Request, Response } from 'express';
import { 
  MarketError, 
  InvalidParameterError, 
  marketErrorHandler 
} from '../../src/middleware/marketErrorHandler';

describe('Market Error Handler', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  it('should handle MarketError correctly', () => {
    const mockError = new InvalidParameterError('Invalid coin ID');
    
    marketErrorHandler(
      mockError, 
      mockReq as Request, 
      mockRes as Response, 
      mockNext
    );

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: true,
        type: 'InvalidParameterError',
        message: 'Invalid coin ID'
      })
    );
  });

  it('should handle unexpected errors', () => {
    const unexpectedError = new Error('Unexpected error');
    
    marketErrorHandler(
      unexpectedError, 
      mockReq as Request, 
      mockRes as Response, 
      mockNext
    );

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: true,
        type: 'UnexpectedError'
      })
    );
  });
});