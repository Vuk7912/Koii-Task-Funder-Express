import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Creates a middleware function for validating request parameters against a Zod schema
 * @param schema Zod schema to validate against
 * @param location Location of parameters to validate (query, body, params)
 * @returns Middleware function
 */
export const validate = (schema: ZodSchema, location: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the specified location against the schema
      const validatedData = schema.parse(req[location]);
      
      // If validation succeeds, attach validated data to request
      req[`validated${location.charAt(0).toUpperCase() + location.slice(1)}`] = validatedData;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Return detailed validation errors
        return res.status(400).json({
          error: 'Validation Error',
          details: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          }))
        });
      }
      
      // Handle any other unexpected errors
      next(error);
    }
  };
};