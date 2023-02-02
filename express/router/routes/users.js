const bcrypt = require('bcrypt');
const { models } = require('../../../sequelize');
const UserDto = require('../dtos/userDto');
const ApiError = require('../../exceptions/apiError');
const tokenService = require('../../services/TokenService');
ApiError
require('dotenv').config();

async function getAll(req, res) {
  const users = await models.user.findAll();
  res.status(200).json(users);
}

async function signup(req, res) {
  const userInDB = await models.user.findOne({
    where: {
      login: req.body.login,
    },
  });
  if (userInDB) {
    res.status(400).send(`Bad request: user exists already.`);
  } else {
    const hash = await getHashPassword(req.body.password);
    req.body.password = hash;
    await models.user.create(req.body);
    const userData = await createResponseFromUserData(req.body);
    res.cookie('accessToken', userData.refreshToken, {
      maxAge:
        parseInt(process.env.REFRESH_TOKEN_EXPIRES_DAYS) * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(201).json(userData);
  }
}

async function signin(req, res) {
  const userInDB = await models.user.findOne({
    where: {
      login: req.body.login,
    },
  });
  if (!userInDB) {
    res.status(400).send(`Bad request: user not exists.`);
  } else {
    const isCorrectPass = await bcrypt.compare(
      req.body.password,
      userInDB.password
    );
    if (!isCorrectPass) {
      res.status(400).send(`This password is not correct!`);
    }
    const userData = await createResponseFromUserData(req.body);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge:
        parseInt(process.env.REFRESH_TOKEN_EXPIRES_DAYS) * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json(userData);
  }
}

async function signout(req, res) {
  await tokenService.removeRefreshToken(req.cookies.refreshToken);
  res.clearCookie('refreshToken');
  return res.status(200).json('Unauthorized successfully!');
}

async function refresh(req, res) {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }
  const userData = tokenService.verifyRefreshToken(refreshToken);
  const tokenFromDb = await tokenService.findRefreshToken(refreshToken);
  const tokenDataFromDB = await models.token.findOne({
    where: {
      refreshToken: refreshToken,
    },
  });
  if (!tokenDataFromDB) {
    res.status(200).json(await createResponseFromUserData(userData));
  } else {
    const userInDB = await models.user.findOne({
      where: {
        login: tokenDataFromDB.login,
      },
    });
    res.status(200).json(await createResponseFromUserData(userInDB));
  }
  return res;
}

async function createResponseFromUserData(userData) {
  const userDto = new UserDto(userData);
  const tokens = tokenService.getNewTokens({ ...userDto });
  await tokenService.saveRefreshToken({
    login: userDto.login,
    refreshToken: tokens.refreshToken,
  });
  return {
    ...tokens,
    user: userDto,
  };
}

async function getHashPassword(password) {
  const SALT_ROUNDS = +process.env.SALT_ROUNDS || 5;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

module.exports = {
  getAll,
  signup,
  signin,
  signout,
  refresh,
};
