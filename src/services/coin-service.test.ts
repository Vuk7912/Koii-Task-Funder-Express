import { describe, it, expect } from 'vitest';
import { CoinService } from './coin-service';

describe('CoinService', () => {
  const coinService = CoinService.getInstance();

  it('should retrieve singleton instance consistently', () => {
    const anotherInstance = CoinService.getInstance();
    expect(coinService).toBe(anotherInstance);
  });

  it('should retrieve coin by valid ID', () => {
    const bitcoin = coinService.getCoinById('bitcoin');
    expect(bitcoin).toBeDefined();
    expect(bitcoin?.name).toBe('Bitcoin');
    expect(bitcoin?.symbol).toBe('btc');
  });

  it('should return undefined for non-existent coin ID', () => {
    const nonExistentCoin = coinService.getCoinById('non-existent-coin');
    expect(nonExistentCoin).toBeUndefined();
  });

  it('should throw error for empty coin ID', () => {
    expect(() => coinService.getCoinById('')).toThrow('Coin ID is required');
  });

  it('should list all coins', () => {
    const allCoins = coinService.listCoins();
    expect(allCoins.length).toBeGreaterThan(0);
  });

  it('should search coins by name', () => {
    const bitcoinResults = coinService.searchCoins('bitcoin');
    expect(bitcoinResults.length).toBeGreaterThan(0);
    expect(bitcoinResults[0].name).toBe('Bitcoin');
  });

  it('should search coins by symbol', () => {
    const ethResults = coinService.searchCoins('eth');
    expect(ethResults.length).toBeGreaterThan(0);
    expect(ethResults[0].symbol).toBe('eth');
  });

  it('should return empty array for empty search query', () => {
    const emptyResults = coinService.searchCoins('');
    expect(emptyResults.length).toBe(0);
  });
});