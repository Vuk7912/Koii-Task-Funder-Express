import { Request, Response, NextFunction } from 'express';

/**
 * Validate query parameters for coin list retrieval
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export const validateCoinListParams = (req: Request, res: Response, next: NextFunction) => {
  const { page, per_page, order, sort_by, search } = req.query;

  // Validate page number
  if (page && (isNaN(Number(page)) || Number(page) < 1)) {
    return res.status(400).json({
      error: 'Invalid page number',
      message: 'Page number must be a positive integer'
    });
  }

  // Validate per_page number
  if (per_page && (isNaN(Number(per_page)) || Number(per_page) < 1 || Number(per_page) > 250)) {
    return res.status(400).json({
      error: 'Invalid per_page value',
      message: 'Per page must be between 1 and 250'
    });
  }

  // Validate order
  if (order && !['asc', 'desc'].includes(String(order).toLowerCase())) {
    return res.status(400).json({
      error: 'Invalid order parameter',
      message: 'Order must be either "asc" or "desc"'
    });
  }

  // Validate sort_by
  const validSortColumns = ['market_cap', 'price', 'name'];
  if (sort_by && !validSortColumns.includes(String(sort_by).toLowerCase())) {
    return res.status(400).json({
      error: 'Invalid sort_by parameter',
      message: `Sort by must be one of: ${validSortColumns.join(', ')}`
    });
  }

  // Optional: Validate search parameter length
  if (search && String(search).length > 50) {
    return res.status(400).json({
      error: 'Search parameter too long',
      message: 'Search term must be 50 characters or less'
    });
  }

  next();
};