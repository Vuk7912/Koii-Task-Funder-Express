import { z } from 'zod';

// Schema for coin list query parameters
export const coinListSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().min(1).max(250).optional().default(100),
  order: z.enum(['market_cap_desc', 'market_cap_asc']).optional().default('market_cap_desc')
});

// Schema for single coin details parameters
export const coinDetailsSchema = z.object({
  id: z.string().min(1).max(100),
  localization: z.coerce.boolean().optional().default(true),
  tickers: z.coerce.boolean().optional().default(false),
  market_data: z.coerce.boolean().optional().default(true),
  community_data: z.coerce.boolean().optional().default(false),
  developer_data: z.coerce.boolean().optional().default(false)
});

// Schema for market data query parameters
export const marketDataSchema = z.object({
  ids: z.string().transform(val => val.split(',')),
  vs_currencies: z.string().transform(val => val.split(',')),
  include_market_cap: z.coerce.boolean().optional().default(true),
  include_24hr_vol: z.coerce.boolean().optional().default(true),
  include_24hr_change: z.coerce.boolean().optional().default(true)
});