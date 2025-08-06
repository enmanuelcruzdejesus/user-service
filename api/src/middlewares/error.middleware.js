
module.exports = function errorHandler(err, req, res, _next) {
  // Basic console logging (swap for Winston / Pino in prod)
  console.error('[ERROR]', err);

  // Joi validation errors come with isJoi flag
  if (err && err.isJoi) {
    return res.status(400).json({
      error: 'ValidationError',
      details: err.details.map((d) => d.message),
    });
  }

  // Use custom status if provided, else 500
  const status = err.statusCode || err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
};
