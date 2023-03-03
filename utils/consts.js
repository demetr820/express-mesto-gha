const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const status = {
  badRequest: 400,
  notFound: 404,
  default: 500,
};

module.exports = apiLimiter;
module.exports = status;
