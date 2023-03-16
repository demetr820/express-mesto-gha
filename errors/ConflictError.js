const { status } = require('../utils/consts');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = status.conflict;
  }
}

module.exports = ConflictError;
