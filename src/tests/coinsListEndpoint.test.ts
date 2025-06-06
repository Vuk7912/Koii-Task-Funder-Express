import { describe, it, expect } from 'vitest';
import { getCoinsList } from '../services/coinsService';
import { validateCoinsList } from '../utils/validation';

describe('Coins List Endpoint', () => {
  it('should return a list of coins with correct structure', () => {
    const coinsList = getCoinsList();
    
    // Check that the result is an array
    expect(Array.isArray(coinsList)).toBe(true);
    
    // Ensure the list is not empty
    expect(coinsList.length).toBeGreaterThan(0);
    
    // Validate each coin object has required properties
    coinsList.forEach(coin => {
      expect(coin).toHaveProperty('id');
      expect(coin).toHaveProperty('symbol');
      expect(coin).toHaveProperty('name');
      
      // Validate types of properties
      expect(typeof coin.id).toBe('string');
      expect(typeof coin.symbol).toBe('string');
      expect(typeof coin.name).toBe('string');
    });
  });

  it('should pass validation for coins list', () => {
    const coinsList = getCoinsList();
    const validationResult = validateCoinsList(coinsList);
    
    expect(validationResult).toBe(true);
  });

  it('should handle empty list scenario', () => {
    // Mock an empty coins list
    const emptyCoinsList: any[] = [];
    const validationResult = validateCoinsList(emptyCoinsList);
    
    expect(validationResult).toBe(false);
  });

  it('should have unique coin IDs', () => {
    const coinsList = getCoinsList();
    const coinIds = coinsList.map(coin => coin.id);
    const uniqueCoinIds = new Set(coinIds);
    
    expect(uniqueCoinIds.size).toBe(coinIds.length);
  });
});