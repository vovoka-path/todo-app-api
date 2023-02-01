const ApiError = require('../exceptions/apiError');
const ConsoleLogger = require('../helpers/consoleLogger');

// eslint-disable-next-line no-unused-vars
function errorMiddleware(error, req, res, next) {
  ConsoleLogger.error('# errorMiddleware handled error');

  if (error instanceof ApiError) {
    return res.status(error.status).json({
      message: error.message,
      errors: error.errors,
    });
  }

  return res.status(500).json({
    message: 'An unexpected error occurred.',
  });
}

module.exports = errorMiddleware;
