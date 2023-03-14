const status = require('../utils/consts');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = status.unauthorized;
  }
}

module.exports = UnauthorizedError;
