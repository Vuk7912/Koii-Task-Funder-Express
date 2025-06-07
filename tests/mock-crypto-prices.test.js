const mockCryptoPrices = require('../src/data/crypto-prices.json');

describe('Mock Crypto Prices', () => {
  it('should have valid mock crypto prices data', () => {
    expect(mockCryptoPrices).toBeDefined();
    expect(typeof mockCryptoPrices).toBe('object');
    
    // Check that there are prices for multiple cryptocurrencies
    const coinIds = Object.keys(mockCryptoPrices);
    expect(coinIds.length).toBeGreaterThan(0);

    // Validate structure of each cryptocurrency entry
    coinIds.forEach(coinId => {
      const coinData = mockCryptoPrices[coinId];
      expect(coinData).toHaveProperty('usd');
      expect(typeof coinData.usd).toBe('number');
      expect(coinData.usd).toBeGreaterThan(0);
    });
  });
});