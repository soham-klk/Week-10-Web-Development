/**
 * Centralized error-handling middleware.
 * Must be registered LAST in Express app.
 */
const errorHandler = (err, req, res, next) => {
  // Log full error server-side (never expose details to client)
  console.error(`[ERROR] ${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  console.error(err.stack || err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'An unexpected error occurred.';

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const messages = Object.values(err.errors).map((e) => e.message);
    message = messages[0] || 'Validation failed.';
  }

  // Mongoose CastError (bad ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: '${err.value}' is not a valid ID.`;
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `A record with that ${field} already exists.`;
  }

  // JWT errors (shouldn't reach here normally, handled in middleware)
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token.';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token has expired. Please log in again.';
  }

  // SyntaxError (malformed JSON body)
  if (err instanceof SyntaxError && err.status === 400) {
    statusCode = 400;
    message = 'Malformed JSON in request body.';
  }

  // Never expose stack traces or internal details in production
  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * 404 handler — catches unmatched routes
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export default errorHandler;
