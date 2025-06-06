import { Response } from 'express';
import winston from 'winston';

/**
 * Enum representing standard HTTP error codes
 */
export enum HttpErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}

/**
 * Interface for standardized error response
 */
export interface ErrorResponse {
  success: boolean;
  error: {
    code: number;
    message: string;
    details?: string | Record<string, unknown>;
  };
}

/**
 * Utility for creating standardized error responses
 */
export class ErrorResponseUtil {
  private logger: winston.Logger;

  constructor() {
    // Initialize Winston logger
    this.logger = winston.createLogger({
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log' })
      ]
    });
  }

  /**
   * Send a standardized error response
   * @param res Express response object
   * @param errorCode HTTP error code
   * @param message Error message
   * @param details Optional additional error details
   */
  public sendErrorResponse(
    res: Response, 
    errorCode: HttpErrorCode, 
    message: string, 
    details?: string | Record<string, unknown>
  ): Response {
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        code: errorCode,
        message,
        details
      }
    };

    // Log the error
    this.logger.error(message, { 
      code: errorCode, 
      details 
    });

    return res.status(errorCode).json(errorResponse);
  }

  /**
   * Create a validation error response
   * @param res Express response object
   * @param validationErrors Validation error details
   */
  public sendValidationError(
    res: Response, 
    validationErrors: Record<string, unknown>
  ): Response {
    return this.sendErrorResponse(
      res, 
      HttpErrorCode.BAD_REQUEST, 
      'Validation Error', 
      validationErrors
    );
  }

  /**
   * Create a not found error response
   * @param res Express response object
   * @param resourceName Name of the resource not found
   */
  public sendNotFoundError(
    res: Response, 
    resourceName: string
  ): Response {
    return this.sendErrorResponse(
      res, 
      HttpErrorCode.NOT_FOUND, 
      `${resourceName} not found`
    );
  }
}

// Export a singleton instance
export const errorResponseUtil = new ErrorResponseUtil();