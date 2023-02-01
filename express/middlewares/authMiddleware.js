const tokenService = require('../services/TokenService');
const ApiError = require('../exceptions/apiError');

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(
        ApiError.UnauthorizedError('Authorization in Headers not found!')
      );
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError('Access Token not found!'));
    }

    const userData = tokenService.verifyAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError('Access Token is not verified!'));
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}

module.exports = authMiddleware;
