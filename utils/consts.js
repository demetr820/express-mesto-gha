const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const status = {
  ok: 200,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  conflict: 409,
  notFound: 404,
  default: 500,
};

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new BadRequestError('Неправильный формат ссылки');
  }
  return value;
};

exports.status = status;
exports.validateURL = validateURL;
