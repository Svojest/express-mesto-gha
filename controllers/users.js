const User = require('../models/user');
const { ERROR_CODE, ERROR_TYPE, ERROR_MESSAGE } = require('../constans/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === ERROR_TYPE.valid) {
        return res
          .status(ERROR_CODE.badRequest)
          .send({ message: ERROR_MESSAGE.valid });
      }
      return res
        .status(ERROR_CODE.internalServerError)
        .send({ message: ERROR_MESSAGE.default });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODE.notFound)
          .send({ message: ERROR_MESSAGE.notFound });
      }
      res.send({ data: user });
      return true;
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.valid || err.name === ERROR_TYPE.cast) {
        return res
          .status(ERROR_CODE.badRequest)
          .send({ message: ERROR_MESSAGE.valid });
      }
      return res
        .status(ERROR_CODE.internalServerError)
        .send({ message: ERROR_MESSAGE.default });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.valid || err.name === ERROR_TYPE.cast) {
        return res
          .status(ERROR_CODE.badRequest)
          .send({ message: ERROR_MESSAGE.valid });
      }
      return res
        .status(ERROR_CODE.internalServerError)
        .send({ message: ERROR_MESSAGE.default });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODE.notFound)
          .send({ message: ERROR_MESSAGE.notFound });
      }
      res.send({ data: user });
      return true;
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.valid || err.name === ERROR_TYPE.cast) {
        return res
          .status(ERROR_CODE.badRequest)
          .send({ message: ERROR_MESSAGE.valid });
      }
      return res
        .status(ERROR_CODE.internalServerError)
        .send({ message: ERROR_MESSAGE.default });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODE.notFound)
          .send({ message: ERROR_MESSAGE.notFound });
      }
      res.send({ data: user });
      return true;
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.valid || err.name === ERROR_TYPE.cast) {
        return res
          .status(ERROR_CODE.badRequest)
          .send({ message: ERROR_MESSAGE.valid });
      }
      return res
        .status(ERROR_CODE.internalServerError)
        .send({ message: ERROR_MESSAGE.default });
    });
};
