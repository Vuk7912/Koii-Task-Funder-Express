import { describe, it, expect } from 'vitest';
import { CoinService } from '../src/services/coinService';

describe('CoinService', () => {
  describe('getCoinDetails', () => {
    it('should retrieve details for an existing coin (case-insensitive)', () => {
      const bitcoinDetails = CoinService.getCoinDetails('bitcoin');
      expect(bitcoinDetails).toBeDefined();
      expect(bitcoinDetails.name).toBe('Bitcoin');
    });

    it('should retrieve details for a coin with different casing', () => {
      const bitcoinDetails = CoinService.getCoinDetails('BITCOIN');
      expect(bitcoinDetails).toBeDefined();
      expect(bitcoinDetails.id).toBe('bitcoin');
    });

    it('should throw an error for a non-existent coin', () => {
      expect(() => CoinService.getCoinDetails('dogecoin'))
        .toThrow('Coin with ID dogecoin not found');
    });

    it('should throw an error for empty coin ID', () => {
      expect(() => CoinService.getCoinDetails(''))
        .toThrow('Coin ID is required');
    });
  });

  describe('listCoins', () => {
    it('should return a list of coin IDs', () => {
      const coins = CoinService.listCoins();
      expect(coins).toContain('bitcoin');
      expect(coins).toContain('ethereum');
      expect(coins).toContain('cardano');
    });
  });
});