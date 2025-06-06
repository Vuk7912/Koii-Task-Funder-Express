const { describe, it, expect } = require('vitest');
const { errorHandler, notFoundHandler } = require('../../src/middleware/errorHandler');

describe('Error Handling Middleware', () => {
  describe('errorHandler', () => {
    it('should return a 500 error for unhandled errors', () => {
      const mockError = new Error('Test Error');
      const mockReq = {};
      const mockRes = {
        status: (code) => {
          expect(code).toBe(500);
          return {
            json: (body) => {
              expect(body).toEqual({
                status: 'error',
                statusCode: 500,
                message: 'Test Error'
              });
            }
          };
        }
      };
      const mockNext = () => {};

      errorHandler(mockError, mockReq, mockRes, mockNext);
    });

    it('should respect custom error status codes', () => {
      const mockError = new Error('Validation Error');
      mockError.status = 400;
      const mockReq = {};
      const mockRes = {
        status: (code) => {
          expect(code).toBe(400);
          return {
            json: (body) => {
              expect(body).toEqual({
                status: 'error',
                statusCode: 400,
                message: 'Validation Error'
              });
            }
          };
        }
      };
      const mockNext = () => {};

      errorHandler(mockError, mockReq, mockRes, mockNext);
    });
  });

  describe('notFoundHandler', () => {
    it('should return a 404 error for undefined routes', () => {
      const mockReq = { originalUrl: '/non-existent-route' };
      const mockRes = {
        status: (code) => {
          expect(code).toBe(404);
          return {
            json: (body) => {
              expect(body).toEqual({
                status: 'error',
                statusCode: 404,
                message: 'Route /non-existent-route Not Found'
              });
            }
          };
        }
      };

      notFoundHandler(mockReq, mockRes);
    });
  });
});