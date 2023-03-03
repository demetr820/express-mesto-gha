const status = require('../utils/consts');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = status.badRequest;
  }
}

module.exports = BadRequestError;
