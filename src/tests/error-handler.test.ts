import { describe, it, expect } from 'vitest';
import { 
  CoinError, 
  CoinNotFoundError, 
  InvalidCoinIdError, 
  CoinDataFetchError 
} from '../errors/coin-error';

describe('CoinGecko Mock API - Error Handling', () => {
  describe('CoinError', () => {
    it('should create a generic CoinError with default values', () => {
      const error = new CoinError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.errorCode).toBeUndefined();
    });

    it('should create a CoinError with custom status and error code', () => {
      const error = new CoinError('Custom error', 400, 'CUSTOM_ERROR');
      expect(error.message).toBe('Custom error');
      expect(error.statusCode).toBe(400);
      expect(error.errorCode).toBe('CUSTOM_ERROR');
    });

    it('should generate a correct response object', () => {
      const error = new CoinError('Response error', 404, 'NOT_FOUND');
      const responseObj = error.toResponseObject();
      
      expect(responseObj).toEqual({
        error: {
          message: 'Response error',
          code: 'NOT_FOUND',
          status: 404
        }
      });
    });
  });

  describe('Specific Error Types', () => {
    it('CoinNotFoundError should have correct properties', () => {
      const error = new CoinNotFoundError('bitcoin');
      expect(error.message).toBe('Coin with ID bitcoin not found');
      expect(error.statusCode).toBe(404);
      expect(error.errorCode).toBe('COIN_NOT_FOUND');
    });

    it('InvalidCoinIdError should have correct properties', () => {
      const error = new InvalidCoinIdError('invalid-coin');
      expect(error.message).toBe('Invalid coin ID provided: invalid-coin');
      expect(error.statusCode).toBe(400);
      expect(error.errorCode).toBe('INVALID_COIN_ID');
    });

    it('CoinDataFetchError should have correct properties', () => {
      const error = new CoinDataFetchError();
      expect(error.message).toBe('Failed to fetch coin data');
      expect(error.statusCode).toBe(500);
      expect(error.errorCode).toBe('COIN_DATA_FETCH_ERROR');
    });
  });
});