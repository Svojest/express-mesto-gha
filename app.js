const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors, celebrate, Joi } = require('celebrate');

const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { ERROR_MESSAGE } = require('./constans/errors');
const { REGEX_URL } = require('./constans/regex');
const NotFoundError = require('./errors/notFound');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
app.use(helmet());

// Без защиты роутов
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(REGEX_URL),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);

// Защита роутов
app.use(auth);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

// Неверные пути
app.use(() => {
  throw new NotFoundError(ERROR_MESSAGE.notFound);
});

app.use(errors());

app.use((err, req, res, next) => {
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

app.listen(PORT, () => {
  console.log(PORT);
});
