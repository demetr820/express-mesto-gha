const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/ForbiddenError');

const { JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new ForbiddenError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  const payload = jwt.verify(
    token,
    JWT_SECRET,
  );
  req.user = payload;
  next();
};

module.exports = auth;
