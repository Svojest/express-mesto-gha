const { ERROR_CODE } = require('../constans/errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = ERROR_CODE.notFound;
  }
}

module.exports = NotFoundError;
