const { ERROR_CODE } = require('../constans/errors');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = ERROR_CODE.unauthorized;
  }
}

module.exports = AuthError;
