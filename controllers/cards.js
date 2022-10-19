const Card = require('../models/card');
const NotFoundError = require('../errors/notFound');
const ForbiddenError = require('../errors/forbidden');

const { ERROR_MESSAGE } = require('../constans/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_MESSAGE.notFound);
      }
      const isOwn = card.owner._id.equals(req.user._id);
      if (!isOwn) {
        throw new ForbiddenError(ERROR_MESSAGE.forbidden);
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => res.send({ data: deletedCard }))
        .catch(next);
      return true;
    })
    .catch(next);

  return true;
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
      res.send({ data: card });
      return true;
    })
    .catch(next);
  return true;
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
      res.send({ data: card });
      return true;
    })
    .catch(next);
  return true;
};
