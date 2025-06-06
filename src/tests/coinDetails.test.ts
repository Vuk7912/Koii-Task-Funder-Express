import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../app'; // Adjust import path as needed

describe('Coin Details Endpoint', () => {
  let app: any;

  beforeAll(() => {
    app = createApp(); // Initialize the Express app
  });

  it('should return 404 for non-existent coin', async () => {
    const response = await request(app)
      .get('/api/coins/non-existent-coin')
      .expect(404);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Coin not found');
  });

  it('should return correct coin details for valid coin', async () => {
    const response = await request(app)
      .get('/api/coins/bitcoin')
      .expect(200);

    expect(response.body).toHaveProperty('id', 'bitcoin');
    expect(response.body).toHaveProperty('name', 'Bitcoin');
    expect(response.body).toHaveProperty('symbol', 'btc');
    
    // Check for required fields
    expect(response.body).toHaveProperty('market_data');
    expect(response.body.market_data).toHaveProperty('current_price');
    expect(response.body.market_data).toHaveProperty('market_cap');
  });

  it('should handle case-insensitive coin ids', async () => {
    const response = await request(app)
      .get('/api/coins/BITCOIN')
      .expect(200);

    expect(response.body).toHaveProperty('id', 'bitcoin');
  });

  it('should return error for invalid coin id format', async () => {
    const response = await request(app)
      .get('/api/coins/bit coin')
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Invalid coin id');
  });

  it('should include basic coin information', async () => {
    const response = await request(app)
      .get('/api/coins/ethereum')
      .expect(200);

    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('links');
    expect(response.body).toHaveProperty('image');
  });

  it('should have performance metrics', async () => {
    const response = await request(app)
      .get('/api/coins/bitcoin')
      .expect(200);

    expect(response.body.market_data).toHaveProperty('price_change_percentage_24h');
    expect(response.body.market_data).toHaveProperty('price_change_percentage_7d');
    expect(response.body.market_data).toHaveProperty('price_change_percentage_30d');
  });
});