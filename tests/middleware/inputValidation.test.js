const { 
  validateCoinIds, 
  validateVsCurrencies 
} = require('../../src/middleware/inputValidation');

describe('Input Validation Middleware', () => {
  describe('validateCoinIds', () => {
    it('should validate coin IDs correctly', () => {
      const validIds = ['bitcoin', 'ethereum'];
      const invalidIds = ['', null, undefined];

      expect(validateCoinIds(validIds)).toBeTruthy();
      invalidIds.forEach(id => {
        expect(() => validateCoinIds(id)).toThrow();
      });
    });
  });

  describe('validateVsCurrencies', () => {
    it('should validate versus currencies correctly', () => {
      const validCurrencies = ['usd', 'eur'];
      const invalidCurrencies = ['', null, undefined];

      expect(validateVsCurrencies(validCurrencies)).toBeTruthy();
      invalidCurrencies.forEach(currency => {
        expect(() => validateVsCurrencies(currency)).toThrow();
      });
    });
  });
});