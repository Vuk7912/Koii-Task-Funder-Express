import { mockCoins, CoinDetails } from './mockCoinData';

/**
 * Service for retrieving cryptocurrency details
 */
export class CoinService {
  /**
   * Retrieve details for a specific coin by its ID
   * @param coinId - The unique identifier of the coin
   * @returns Detailed coin information or throws an error
   */
  static getCoinDetails(coinId: string): CoinDetails {
    // Validate input
    if (!coinId) {
      throw new Error('Coin ID is required');
    }

    // Find the coin, case-insensitive
    const coin = mockCoins.find(
      (c) => c.id.toLowerCase() === coinId.toLowerCase()
    );

    // Throw error if coin not found
    if (!coin) {
      throw new Error(`Coin with ID ${coinId} not found`);
    }

    return coin;
  }

  /**
   * List all available coins
   * @returns Array of coin IDs
   */
  static listCoins(): string[] {
    return mockCoins.map((coin) => coin.id);
  }
}