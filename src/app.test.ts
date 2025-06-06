import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app';

describe('Hero Endpoints', () => {
  it('should return Spider-Man for /spiderMan endpoint', async () => {
    const response = await request(app).get('/spiderMan');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ hero: 'Spider-Man' });
  });
});