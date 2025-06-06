/**
 * Global error handling middleware
 * @param {Error} err - The error object
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[Error Handler] ${err.message}`);

  // Determine the appropriate status code
  const statusCode = err.status || 500;

  // Send standardized error response
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * 404 Not Found middleware
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: `Route ${req.originalUrl} Not Found`
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};