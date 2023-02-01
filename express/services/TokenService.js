const jwt = require('jsonwebtoken');
const { models } = require('../../sequelize');
const ConsoleLogger = require('../helpers/consoleLogger.js');

require('dotenv').config();

class TokenService {
  constructor() {
    this.key = {
      access: process.env.ACCESS_SECRET_KEY || 'your-access-secret-key',
      refresh: process.env.REFRESH_SECRET_KEY || 'your-refresh-secret-key',
    };
    this.expires = {
      access: process.env.ACCESS_TOKEN_EXPIRES_MINUTES || '30m',
      refresh: process.env.REFRESH_TOKEN_EXPIRES_DAYS || '30d',
    };
  }

  getNewTokens(userData) {
    try {
      const accessToken = jwt.sign(userData, this.key.access, {
        expiresIn: this.expires.access,
      });
      const refreshToken = jwt.sign(userData, this.key.refresh, {
        expiresIn: this.expires.refresh,
      });
      return { accessToken, refreshToken };
    } catch (e) {
      ConsoleLogger.error('Failed attempt to get tokens!', e.message);
    }
  }

  verifyAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, this.key.access);
      return userData;
    } catch (e) {
      ConsoleLogger.error('accessToken is not verified!', e.message);
      return null;
    }
  }

  verifyRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, this.key.refresh);
      return userData;
    } catch (e) {
      ConsoleLogger.error('refreshToken is not verified!');
      return null;
    }
  }

  async saveRefreshToken({ login, refreshToken }) {
    const refreshTokenData = await models.token.findOne({
      where: { login: login },
    });
    if (refreshTokenData) {
      refreshTokenData.refreshToken = refreshToken;
      return refreshTokenData.save();
    }

    const token = await models.token.create({ login, refreshToken });

    return token;
  }

  async removeRefreshToken(refreshToken) {
    if (refreshToken) {
      await models.token.destroy({
        where: { refreshToken: refreshToken },
      });
    }
    return { refreshToken };
  }

  async findRefreshToken(refreshToken) {
    const refreshTokenData = await models.token.findOne({
      where: { refreshToken: refreshToken },
    });
    return refreshTokenData;
  }
}

module.exports = new TokenService();
