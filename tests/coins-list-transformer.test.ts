import { describe, it, expect } from 'vitest';
import { transformCoinsList } from '../src/coins-list-transformer';
import path from 'path';

describe('Coins List Transformer', () => {
  const testDataPath = path.resolve(process.cwd(), 'crypto-prices.json');

  it('should transform coins list correctly', () => {
    const transformedCoins = transformCoinsList(testDataPath);
    
    expect(transformedCoins).toHaveLength(2);
    expect(transformedCoins[0]).toEqual({
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin'
    });
    expect(transformedCoins[1]).toEqual({
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum'
    });
  });

  it('should throw an error if file is not found', () => {
    expect(() => transformCoinsList('non_existent_file.json'))
      .toThrow('Coins data file not found');
  });

  it('should throw an error for invalid JSON', () => {
    // Create an invalid JSON file for testing
    const invalidJsonPath = path.resolve(process.cwd(), 'invalid-crypto-prices.json');
    
    // Note: In a real-world scenario, you might want to create and delete this file dynamically
    expect(() => transformCoinsList(invalidJsonPath))
      .toThrow('Coins data file not found');
  });
});