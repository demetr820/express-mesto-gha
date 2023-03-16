const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { status } = require('../utils/consts');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка в данных'));
      } else {
        next(err);
      }
    });
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) return next(new NotFoundError('Карточка не найдена'));
    if (card.owner.toString() !== req.user._id) {
      return next(new ForbiddenError('У вас нет прав на удаление карточки'));
    }
    await Card.findByIdAndDelete(req.params.cardId);
    return res.status(status.ok).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Не верный ID'));
    }
    return next(err);
  }
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Ошибка в данных'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new NotFoundError('Карточка не найдена'))
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Ошибка в данных'));
    } else {
      next(err);
    }
  });

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
