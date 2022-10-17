const Card = require('../models/card');
const { ERROR_CODE, ERROR_TYPE, ERROR_MESSAGE } = require('../constans/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      res.send({ data: card });
    })
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

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
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

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_CODE.notFound)
          .send({ message: ERROR_MESSAGE.notFound });
      }
      return res.send({ data: card });
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
  return true;
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_CODE.notFound)
          .send({ message: ERROR_MESSAGE.notFound });
      }
      return res.send({ data: card });
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
  return true;
};

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_CODE.notFound)
          .send({ message: ERROR_MESSAGE.notFound });
      }
      return res.send({ data: card });
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
  return true;
};
