import { MarketData } from '../types/market-data';

/**
 * Mock market data for cryptocurrencies
 * Provides simulated market information for testing and development
 */
export const mockMarketData: Record<string, MarketData> = {
  'bitcoin': {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 45000.00,
    market_cap: 860000000000,
    market_cap_rank: 1,
    total_volume: 25000000000,
    price_change_percentage_24h: 2.5,
    circulating_supply: 19000000,
    total_supply: 21000000,
  },
  'ethereum': {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 3000.00,
    market_cap: 360000000000,
    market_cap_rank: 2,
    total_volume: 15000000000,
    price_change_percentage_24h: 1.8,
    circulating_supply: 120000000,
    total_supply: 120000000,
  },
  'cardano': {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    current_price: 1.20,
    market_cap: 40000000000,
    market_cap_rank: 7,
    total_volume: 2000000000,
    price_change_percentage_24h: 3.2,
    circulating_supply: 33000000000,
    total_supply: 45000000000,
  }
};