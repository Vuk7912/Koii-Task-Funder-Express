import { describe, it, expect } from 'vitest';
import { validateCoinId } from './coinValidation';

describe('Coin ID Validation', () => {
    // Valid input tests
    it('should accept valid lowercase alphanumeric coin ID', () => {
        const result = validateCoinId('bitcoin');
        expect(result).toBe('bitcoin');
    });

    it('should accept valid coin ID with hyphens', () => {
        const result = validateCoinId('bitcoin-cash');
        expect(result).toBe('bitcoin-cash');
    });

    it('should trim and lowercase input', () => {
        const result = validateCoinId('  Bitcoin  ');
        expect(result).toBe('bitcoin');
    });

    // Invalid input tests
    it('should throw error for undefined input', () => {
        expect(() => validateCoinId(undefined)).toThrow('Coin ID cannot be undefined or null');
    });

    it('should throw error for null input', () => {
        expect(() => validateCoinId(null)).toThrow('Coin ID cannot be undefined or null');
    });

    it('should throw error for non-string input', () => {
        expect(() => validateCoinId(123)).toThrow('Coin ID must be a string. Received: number');
        expect(() => validateCoinId({})).toThrow('Coin ID must be a string. Received: object');
    });

    it('should throw error for empty string', () => {
        expect(() => validateCoinId('')).toThrow('Coin ID cannot be an empty string');
        expect(() => validateCoinId('   ')).toThrow('Coin ID cannot be an empty string');
    });

    it('should throw error for invalid characters', () => {
        expect(() => validateCoinId('bitcoin!')).toThrow('Coin ID can only contain lowercase letters, numbers, and hyphens');
        expect(() => validateCoinId('Bitcoin Cash')).toThrow('Coin ID can only contain lowercase letters, numbers, and hyphens');
    });
});