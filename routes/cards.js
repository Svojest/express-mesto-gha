const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { REGEX_URL } = require('../constans/regex');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(REGEX_URL),
  }),
}), createCard);

router.put('/:cardId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), likeCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), deleteCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), unlikeCard);

module.exports = router;
