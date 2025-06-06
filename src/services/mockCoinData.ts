// Mock cryptocurrency data for CoinGecko API simulation

export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  description: string;
  marketCap: number;
  currentPrice: number;
  priceChangePercentage24h: number;
}

export const mockCoins: CoinDetails[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    description: 'The first and most famous cryptocurrency',
    marketCap: 500000000000,
    currentPrice: 30000,
    priceChangePercentage24h: 2.5
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    description: 'Decentralized blockchain platform with smart contract functionality',
    marketCap: 250000000000,
    currentPrice: 1800,
    priceChangePercentage24h: 1.7
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    description: 'Blockchain platform for sustainable development and scalability',
    marketCap: 50000000000,
    currentPrice: 0.5,
    priceChangePercentage24h: 3.2
  }
];