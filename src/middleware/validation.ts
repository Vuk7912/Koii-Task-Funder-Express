import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

/**
 * Create a middleware function for validating request parameters
 * @param schema Zod schema for validation
 * @returns Middleware function
 */
export const validateRequest = (schema: z.ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate body, params, and query based on the provided schema
      const validatedData = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      });

      // Explicitly match the expected structure
      req.validatedData = {
        body: req.body || {},
        params: req.params || {},
        query: validatedData.query || {}
      };

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Return detailed validation errors
        return res.status(400).json({
          error: 'Validation Failed',
          details: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          }))
        });
      }
      // For any other unexpected errors
      next(error);
    }
  };
};

/**
 * Schema for coin list request validation
 */
export const coinListSchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 100),
    order: z.enum(['market_cap_desc', 'market_cap_asc']).optional().default('market_cap_desc')
  })
});

/**
 * Schema for single coin details request validation
 */
export const coinDetailsSchema = z.object({
  params: z.object({
    coinId: z.string().min(1, 'Coin ID is required')
  }),
  query: z.object({
    localization: z.string().optional().transform(val => val === 'true').default('true'),
    tickers: z.string().optional().transform(val => val === 'true').default('false'),
    market_data: z.string().optional().transform(val => val === 'true').default('false'),
    community_data: z.string().optional().transform(val => val === 'true').default('false')
  }).optional()
}).transform(data => ({
  body: {},
  params: data.params,
  query: data.query ? {
    localization: data.query.localization,
    market_data: data.query.market_data,
    tickers: data.query.tickers,
    community_data: data.query.community_data
  } : {}
}));

/**
 * Schema for market data request validation
 */
export const marketDataSchema = z.object({
  query: z.object({
    vs_currency: z.string().default('usd'),
    ids: z.string().optional().transform(val => val ? val.split(',') : []),
    order: z.enum(['market_cap_desc', 'market_cap_asc', 'volume_desc']).optional().default('market_cap_desc'),
    per_page: z.string().optional().transform(val => val ? parseInt(val, 10) : 100),
    page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
    sparkline: z.string().optional().transform(val => val === 'true')
  })
});