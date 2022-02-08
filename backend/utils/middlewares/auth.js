const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_SECRET } = require('../../config');

function auth(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError('необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('токен не прошел проверку');
  }

  req.user = payload;

  next();
}

module.exports = auth;
