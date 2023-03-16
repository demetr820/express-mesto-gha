const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET } = require('../config');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = await jwt.verify(token, JWT_SECRET);
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
