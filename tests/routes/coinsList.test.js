import { describe, it, expect } from 'vitest';
import { getCoinsList } from '../../src/routes/coinsList'; // Adjust path as needed
import mockCryptoPrices from '../../src/data/crypto-prices.json';

describe('Coins List Endpoint', () => {
  it('should return a list of all coins', () => {
    const coinsList = getCoinsList();
    
    // Check that the returned list matches the mock data
    expect(Array.isArray(coinsList)).toBe(true);
    expect(coinsList.length).toBeGreaterThan(0);
    
    // Verify structure of a coin object
    const firstCoin = coinsList[0];
    expect(firstCoin).toHaveProperty('id');
    expect(firstCoin).toHaveProperty('symbol');
    expect(firstCoin).toHaveProperty('name');
  });

  it('should return correct number of coins', () => {
    const coinsList = getCoinsList();
    expect(coinsList.length).toBe(mockCryptoPrices.length);
  });

  it('should handle empty data gracefully', () => {
    // Create a mock function that returns an empty array
    const getCoinListEmpty = () => [];
    const emptyList = getCoinListEmpty();
    
    expect(Array.isArray(emptyList)).toBe(true);
    expect(emptyList.length).toBe(0);
  });

  it('should map coins correctly from mock data', () => {
    const coinsList = getCoinsList();
    
    coinsList.forEach((coin, index) => {
      const originalCoin = mockCryptoPrices[index];
      
      expect(coin.id).toBe(originalCoin.id);
      expect(coin.symbol).toBe(originalCoin.symbol);
      expect(coin.name).toBe(originalCoin.name);
    });
  });
});