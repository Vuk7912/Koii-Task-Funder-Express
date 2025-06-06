import { describe, it, expect } from 'vitest';
import { validateCoinId, sanitizeCoinId } from '../src/utils/coinIdValidator';

describe('Coin ID Validation', () => {
  describe('validateCoinId', () => {
    it('should return false for non-string inputs', () => {
      expect(validateCoinId(null)).toBe(false);
      expect(validateCoinId(undefined)).toBe(false);
      expect(validateCoinId(123)).toBe(false);
      expect(validateCoinId({})).toBe(false);
    });

    it('should return false for empty or whitespace-only strings', () => {
      expect(validateCoinId('')).toBe(false);
      expect(validateCoinId('   ')).toBe(false);
    });

    it('should return true for valid coin IDs', () => {
      expect(validateCoinId('bitcoin')).toBe(true);
      expect(validateCoinId('ethereum')).toBe(true);
      expect(validateCoinId('binance-coin')).toBe(true);
    });

    it('should return false for invalid characters', () => {
      expect(validateCoinId('bitcoin!')).toBe(false);
      expect(validateCoinId('ethereum@coin')).toBe(false);
      expect(validateCoinId('coin with spaces')).toBe(false);
    });
  });

  describe('sanitizeCoinId', () => {
    it('should return null for invalid inputs', () => {
      expect(sanitizeCoinId(null)).toBe(null);
      expect(sanitizeCoinId('')).toBe(null);
      expect(sanitizeCoinId('bitcoin!')).toBe(null);
    });

    it('should sanitize valid coin IDs', () => {
      expect(sanitizeCoinId('Bitcoin')).toBe('bitcoin');
      expect(sanitizeCoinId('  Ethereum  ')).toBe('ethereum');
      expect(sanitizeCoinId('Binance-Coin')).toBe('binance-coin');
    });
  });
});