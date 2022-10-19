const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/auth');
const { REGEX_URL } = require('../constans/regex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator(v) {
        return REGEX_URL.test(v);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return REGEX_URL.test(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильная почта'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильная пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
