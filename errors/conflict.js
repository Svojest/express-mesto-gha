const { ERROR_CODE } = require('../constans/errors');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = ERROR_CODE.conflict;
  }
}

module.exports = ConflictError;
