/**
 * Validates a coin ID for CoinGecko API
 * @param coinId - The coin identifier to validate
 * @returns boolean indicating if the coin ID is valid
 */
export function validateCoinId(coinId: unknown): boolean {
  // Check if input is not a string or is an empty string
  if (typeof coinId !== 'string' || coinId.trim() === '') {
    return false;
  }

  // Additional validation rules:
  // 1. Remove whitespace and convert to lowercase
  const sanitizedCoinId = coinId.trim().toLowerCase();

  // 2. Check length constraints (optional, adjust as needed)
  if (sanitizedCoinId.length < 1 || sanitizedCoinId.length > 100) {
    return false;
  }

  // 3. Allow only alphanumeric characters, hyphens, and some special chars
  const validCoinIdRegex = /^[a-z0-9-]+$/;
  return validCoinIdRegex.test(sanitizedCoinId);
}

/**
 * Sanitizes a coin ID for consistent processing
 * @param coinId - The coin identifier to sanitize
 * @returns sanitized coin ID or null if invalid
 */
export function sanitizeCoinId(coinId: unknown): string | null {
  if (!validateCoinId(coinId)) {
    return null;
  }
  
  return (coinId as string).trim().toLowerCase();
}