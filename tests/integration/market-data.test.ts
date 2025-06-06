import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app'; // Assuming your Express app is exported from app.ts

describe('Market Data Endpoint Integration Tests', () => {
  // Test successful market data retrieval
  it('should return market data for valid coin ids', async () => {
    const coinIds = ['bitcoin', 'ethereum'];
    const response = await request(app)
      .get('/api/markets')
      .query({ ids: coinIds.join(',') });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(coinIds.length);

    // Check each returned market item
    response.body.forEach((market: any) => {
      expect(market).toHaveProperty('id');
      expect(market).toHaveProperty('symbol');
      expect(market).toHaveProperty('name');
      expect(market).toHaveProperty('current_price');
      expect(market).toHaveProperty('market_cap');
      expect(market).toHaveProperty('total_volume');
    });
  });

  // Test with invalid coin ids
  it('should handle invalid coin ids gracefully', async () => {
    const invalidCoinIds = ['nonexistent-coin'];
    const response = await request(app)
      .get('/api/markets')
      .query({ ids: invalidCoinIds.join(',') });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

  // Test without providing coin ids
  it('should return an error when no coin ids are provided', async () => {
    const response = await request(app)
      .get('/api/markets');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // Test with valid but unsupported coin ids
  it('should handle partially valid coin ids', async () => {
    const mixedCoinIds = ['bitcoin', 'unsupported-coin'];
    const response = await request(app)
      .get('/api/markets')
      .query({ ids: mixedCoinIds.join(',') });

    expect(response.status).toBe(200);
    expect(response.body.length).toBeLessThan(mixedCoinIds.length);
  });
});