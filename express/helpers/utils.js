require('dotenv').config();
const REFRESH_TOKEN_EXPIRES_DAYS = process.env.REFRESH_TOKEN_EXPIRES_DAYS;

function getIdAsNumber(req) {
  const id = req.params.id;
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10);
  }
  throw new TypeError(`# Invalid ':id' : "${id}"`);
}

const cookieOption = {
  maxAge: parseInt(REFRESH_TOKEN_EXPIRES_DAYS) * 24 * 60 * 60 * 1000,
  httpOnly: true,
};

module.exports = { getIdAsNumber, cookieOption };
