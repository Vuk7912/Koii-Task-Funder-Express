import { describe, it, expect, vi } from 'vitest';
import { validate } from './validate';
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

describe('Input Validation Middleware', () => {
  const testSchema = z.object({
    name: z.string().min(3),
    age: z.number().int().positive()
  });

  it('should pass valid data', () => {
    const req = {
      body: { name: 'John', age: 30 }
    } as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    const middleware = validate(testSchema);
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.validatedBody).toEqual({ name: 'John', age: 30 });
  });

  it('should reject invalid data', () => {
    const req = {
      body: { name: 'Jo', age: -5 }
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const next = vi.fn() as NextFunction;

    const middleware = validate(testSchema);
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: 'Validation Error',
      details: expect.any(Array)
    }));
  });

  it('should validate different parameter locations', () => {
    const querySchema = z.object({ id: z.string() });
    const req = {
      query: { id: '123' }
    } as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    const middleware = validate(querySchema, 'query');
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.validatedQuery).toEqual({ id: '123' });
  });
});