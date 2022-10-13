const ERROR_CODE = {
  badRequest: 400,
  notFound: 404,
  internalServerError: 500,
};

const ERROR_MESSAGE = {
  valid: 'Data validation failed',
  cast: 'One or more properties cannot be recognized',
  notFound: 'Not found',
  default: 'Internal server Error',
};

const ERROR_TYPE = {
  valid: 'ValidationError',
  cast: 'CastError',
};
module.exports = {
  ERROR_CODE,
  ERROR_TYPE,
  ERROR_MESSAGE,
};
