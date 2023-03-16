const { status } = require('../utils/consts');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = status.forbidden;
  }
}

module.exports = ForbiddenError;
