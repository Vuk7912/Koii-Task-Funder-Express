import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createServer } from '../src/server';

describe('Server Configuration', () => {
  it('should create a server with health check endpoint', async () => {
    const server = createServer();
    const response = await request(server)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('message', 'CoinGecko Mock API is running');
    expect(response.body).toHaveProperty('timestamp');
  });
});