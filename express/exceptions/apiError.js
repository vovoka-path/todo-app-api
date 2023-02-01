class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message = 'Bad request.', errors = []) {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError(message = '') {
    const extendedMessage = 'User not authorized. ' + message;
    return new ApiError(401, extendedMessage);
  }

  static NotFound(message = 'Not found.', errors = []) {
    return new ApiError(404, message, errors);
  }

  static Conflict(message = 'Conflict.', errors = []) {
    return new ApiError(409, message, errors);
  }
}

module.exports = ApiError;
