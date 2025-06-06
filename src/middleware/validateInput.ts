import { Request, Response, NextFunction } from 'express';

/**
 * Input validation middleware for CoinGecko Mock API
 */
export class InputValidationMiddleware {
  /**
   * Validate coin list query parameters
   * @param req Express request object
   * @param res Express response object
   * @param next Next middleware function
   */
  static validateCoinListParams(req: Request, res: Response, next: NextFunction) {
    const { order, per_page, page } = req.query;

    // Validate order parameter
    if (order && typeof order !== 'string') {
      return res.status(400).json({
        error: 'Invalid order parameter. Must be a string.',
        details: 'Order should be a valid sorting string.'
      });
    }

    // Validate per_page parameter
    if (per_page) {
      const perPageNum = Number(per_page);
      if (isNaN(perPageNum) || perPageNum < 1 || perPageNum > 250) {
        return res.status(400).json({
          error: 'Invalid per_page parameter.',
          details: 'Per page must be a number between 1 and 250.'
        });
      }
    }

    // Validate page parameter
    if (page) {
      const pageNum = Number(page);
      if (isNaN(pageNum) || pageNum < 1) {
        return res.status(400).json({
          error: 'Invalid page parameter.',
          details: 'Page must be a positive number.'
        });
      }
    }

    next();
  }

  /**
   * Validate single coin details parameters
   * @param req Express request object
   * @param res Express response object
   * @param next Next middleware function
   */
  static validateCoinDetailsParams(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    // Validate coin ID
    if (!id || typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({
        error: 'Invalid coin ID.',
        details: 'Coin ID must be a non-empty string.'
      });
    }

    next();
  }

  /**
   * Validate market data query parameters
   * @param req Express request object
   * @param res Express response object
   * @param next Next middleware function
   */
  static validateMarketDataParams(req: Request, res: Response, next: NextFunction) {
    const { vs_currency, ids, order, per_page, page, price_change_percentage } = req.query;

    // Validate vs_currency
    if (!vs_currency || typeof vs_currency !== 'string') {
      return res.status(400).json({
        error: 'Invalid vs_currency parameter.',
        details: 'VS currency must be a non-empty string.'
      });
    }

    // Validate ids (optional)
    if (ids && typeof ids !== 'string') {
      return res.status(400).json({
        error: 'Invalid ids parameter.',
        details: 'Ids must be a comma-separated string of coin identifiers.'
      });
    }

    // Validate order (optional)
    if (order && typeof order !== 'string') {
      return res.status(400).json({
        error: 'Invalid order parameter.',
        details: 'Order must be a valid sorting string.'
      });
    }

    // Validate per_page (optional)
    if (per_page) {
      const perPageNum = Number(per_page);
      if (isNaN(perPageNum) || perPageNum < 1 || perPageNum > 250) {
        return res.status(400).json({
          error: 'Invalid per_page parameter.',
          details: 'Per page must be a number between 1 and 250.'
        });
      }
    }

    // Validate page (optional)
    if (page) {
      const pageNum = Number(page);
      if (isNaN(pageNum) || pageNum < 1) {
        return res.status(400).json({
          error: 'Invalid page parameter.',
          details: 'Page must be a positive number.'
        });
      }
    }

    // Validate price_change_percentage (optional)
    if (price_change_percentage && typeof price_change_percentage !== 'string') {
      return res.status(400).json({
        error: 'Invalid price_change_percentage parameter.',
        details: 'Price change percentage must be a string of comma-separated values.'
      });
    }

    next();
  }
}