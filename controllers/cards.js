const Card = require('../models/card');
const NotFoundError = require('../errors/notFound');
const ValidError = require('../errors/valid');
const ForbiddenError = require('../errors/forbidden');

const { ERROR_TYPE, ERROR_MESSAGE } = require('../constans/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === ERROR_TYPE.valid || err.name === ERROR_TYPE.cast) {
        return next(new ValidError(ERROR_MESSAGE.valid));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_MESSAGE.notFound);
      }
      if (card.owner.toString() !== req.user_id) {
        throw new ForbiddenError(ERROR_MESSAGE.forbidden);
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => res.send({ data: deletedCard }))
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_MESSAGE.notFound);
      }
      return res.send({ data: card });
    })
    .catch(next);
};

module.exports.unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_MESSAGE.notFound);
      }
      return res.send({ data: card });
    })
    .catch(next);
};
