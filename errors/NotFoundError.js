const { status } = require('../utils/consts');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = status.notFound;
  }
}

module.exports = NotFoundError;
