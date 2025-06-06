/**
 * Validate a coin ID input
 * 
 * @param coinId - The coin identifier to validate
 * @returns boolean indicating if the coin ID is valid
 * @throws {Error} If input is invalid with a descriptive message
 */
export function validateCoinId(coinId: unknown): string {
    // Check if input is undefined or null
    if (coinId === undefined || coinId === null) {
        throw new Error('Coin ID cannot be undefined or null');
    }

    // Ensure input is a string
    if (typeof coinId !== 'string') {
        throw new Error(`Coin ID must be a string. Received: ${typeof coinId}`);
    }

    // Trim and convert to lowercase
    const trimmedId = coinId.trim().toLowerCase();

    // Check for empty string after trimming
    if (trimmedId.length === 0) {
        throw new Error('Coin ID cannot be an empty string');
    }

    // Validate against basic requirements (e.g., alphanumeric with some allowed special characters)
    const validCoinIdRegex = /^[a-z0-9-]+$/;
    if (!validCoinIdRegex.test(trimmedId)) {
        throw new Error('Coin ID can only contain lowercase letters, numbers, and hyphens');
    }

    // Return the validated and normalized coin ID
    return trimmedId;
}