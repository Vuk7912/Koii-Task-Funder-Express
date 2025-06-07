import { InvalidParameterError } from './marketErrorHandler';

/**
 * Validates an array of coin IDs
 * @param ids Coin IDs to validate
 * @returns boolean indicating validity
 * @throws {InvalidParameterError} If ids are invalid
 */
export function validateCoinIds(ids: string | string[]): boolean {
  const idsArray = Array.isArray(ids) ? ids : [ids];
  
  if (!idsArray || idsArray.length === 0) {
    throw new InvalidParameterError('Coin IDs cannot be empty');
  }

  const isValid = idsArray.every(id => 
    typeof id === 'string' && id.trim().length > 0
  );

  if (!isValid) {
    throw new InvalidParameterError('Invalid coin ID format');
  }

  return true;
}

/**
 * Validates versus currencies
 * @param currencies Currencies to validate
 * @returns boolean indicating validity
 * @throws {InvalidParameterError} If currencies are invalid
 */
export function validateVsCurrencies(currencies: string | string[]): boolean {
  const currenciesArray = Array.isArray(currencies) ? currencies : [currencies];
  
  if (!currenciesArray || currenciesArray.length === 0) {
    throw new InvalidParameterError('Versus currencies cannot be empty');
  }

  const isValid = currenciesArray.every(currency => 
    typeof currency === 'string' && 
    currency.trim().length > 0 && 
    /^[a-z]{3}$/i.test(currency)
  );

  if (!isValid) {
    throw new InvalidParameterError('Invalid versus currency format');
  }

  return true;
}