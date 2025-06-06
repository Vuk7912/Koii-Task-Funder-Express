interface Coin {
  id: string;
  symbol: string;
  name: string;
}

/**
 * Validates the structure and content of coins list
 * @param coinsList List of coins to validate
 * @returns {boolean} Whether the coins list is valid
 */
export function validateCoinsList(coinsList: Coin[]): boolean {
  // Check if list is not empty
  if (coinsList.length === 0) return false;

  // Validate each coin object
  return coinsList.every(coin => 
    typeof coin.id === 'string' && 
    typeof coin.symbol === 'string' && 
    typeof coin.name === 'string' &&
    coin.id.trim() !== '' &&
    coin.symbol.trim() !== '' &&
    coin.name.trim() !== ''
  );
}