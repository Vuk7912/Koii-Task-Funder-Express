import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import coinsRouter from './index';

// Create a test Express app
const app = express();
app.use(express.json());
app.use('/api/v3', coinsRouter);

describe('Coins List Endpoint', () => {
  it('should return a list of cryptocurrencies', async () => {
    const response = await request(app).get('/api/v3/coins/markets');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    
    // Check the structure of the first coin
    const firstCoin = response.body[0];
    expect(firstCoin).toHaveProperty('id');
    expect(firstCoin).toHaveProperty('symbol');
    expect(firstCoin).toHaveProperty('name');
    expect(firstCoin).toHaveProperty('current_price');
    expect(firstCoin).toHaveProperty('market_cap');
    expect(firstCoin).toHaveProperty('total_volume');
  });

  it('should support pagination', async () => {
    const response = await request(app)
      .get('/api/v3/coins/markets')
      .query({ per_page: 2, page: 1 });
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('should return coins sorted by market cap descending by default', async () => {
    const response = await request(app).get('/api/v3/coins/markets');
    
    expect(response.body[0].name).toBe('Bitcoin'); // Highest market cap
    expect(response.body[1].name).toBe('Ethereum'); // Second highest market cap
  });
});