const { ERROR_CODE } = require('../constans/errors');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = ERROR_CODE.forbidden;
  }
}

module.exports = ForbiddenError;
