const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ERROR_CODE, ERROR_MESSAGE } = require('./constans/errors');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '634864f14883a37c42153e59',
  };
  next();
});

app.use('/', require('./routes/cards'));
app.use('/', require('./routes/users'));

app.use((req, res) => {
  res.status(ERROR_CODE.notFound).send({ message: ERROR_MESSAGE.notFound });
});

app.listen(PORT, () => {
  console.log(PORT);
});
