const { ERROR_CODE } = require('../constans/errors');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = ERROR_CODE.default;
  }
}

module.exports = InternalServerError;
