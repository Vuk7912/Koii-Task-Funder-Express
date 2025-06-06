/**
 * Custom error class for coin-related errors
 */
export class CoinError extends Error {
  public statusCode: number;
  public errorCode?: string;

  constructor(
    message: string, 
    statusCode: number = 500, 
    errorCode?: string
  ) {
    super(message);
    this.name = 'CoinError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }

  /**
   * Generates a standardized error response object
   * @returns Error response object
   */
  toResponseObject() {
    return {
      error: {
        message: this.message,
        code: this.errorCode || 'UNKNOWN_ERROR',
        status: this.statusCode
      }
    };
  }
}

/**
 * Error types for different coin-related scenarios
 */
export class CoinNotFoundError extends CoinError {
  constructor(coinId: string) {
    super(`Coin with ID ${coinId} not found`, 404, 'COIN_NOT_FOUND');
  }
}

export class InvalidCoinIdError extends CoinError {
  constructor(coinId: string) {
    super(`Invalid coin ID provided: ${coinId}`, 400, 'INVALID_COIN_ID');
  }
}

export class CoinDataFetchError extends CoinError {
  constructor(message: string = 'Failed to fetch coin data') {
    super(message, 500, 'COIN_DATA_FETCH_ERROR');
  }
}