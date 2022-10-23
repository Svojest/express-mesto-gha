const { ERROR_MESSAGE } = require('../constans/errors');

module.exports = ((err, req, res, next) => {
  // Если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // Проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? ERROR_MESSAGE.default
        : message,
    });
  next();
});
