const bcrypt = require('bcrypt');
const { models } = require('../../../sequelize');
const UserDto = require('../dtos/userDto');
const ApiError = require('../../exceptions/apiError');
const tokenService = require('../../services/TokenService');
const { cookieOption } = require('../../helpers/utils');

require('dotenv').config();

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

    const response = await createResponseFromUserData(req.body);
    res.cookie('refreshToken', response.refreshToken, cookieOption);
    res.status(200).json(response);
  }
}

async function signout(req, res) {
  await tokenService.removeRefreshToken(req.cookies.refreshToken);
  res.clearCookie('refreshToken');
  res.status(200).json('Unauthorized successfully!');
}

async function checkauth(req, res) {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    res.cookie('refreshToken', refreshToken, cookieOption);
  } 

  const accessToken = req.headers.authorization.split(' ')[1];
  const userData = tokenService.verifyAccessToken(accessToken);
  if (userData) {
    res.status(200).json({ userData });
  } else {
    res.status(401).json({});
  }
}

async function refresh(req, res) {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }
  res.cookie('refreshToken', refreshToken, cookieOption);

  const userData = tokenService.verifyRefreshToken(refreshToken);
  if (!userData) {
    throw ApiError.UnauthorizedError();
  }

  const tokenFromDb = await tokenService.findRefreshToken(refreshToken);
  if (!tokenFromDb) {
    throw ApiError.UnauthorizedError();
  }

  const tokenDataFromDB = await models.token.findOne({
    where: {
      refreshToken,
    },
  });
  if (!tokenDataFromDB) {
    const response = await createResponseFromUserData(userData);
    res.cookie('refreshToken', userData.refreshToken, cookieOption);
    res.status(200).json(response);
  } else {
    const userInDB = await models.user.findOne({
      where: {
        login: tokenDataFromDB.login,
      },
    });
    const response = await createResponseFromUserData(userInDB);
    res.cookie('refreshToken', userInDB.refreshToken, cookieOption);
    res.status(200).json(response);
  }
}

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
    const response = await createResponseFromUserData(req.body);
    res.cookie('accessToken', response.refreshToken, cookieOption);
    res.status(201).json(response);
  }
}

module.exports = {
  getAll,
  signup,
  signin,
  signout,
  checkauth,
  refresh,
};
