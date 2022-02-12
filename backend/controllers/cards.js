const Card = require('../models/card');
const NotFoundError = require('../utils/errors/not-found-error');
const ForbiddenError = require('../utils/errors/forbidden-error');
const InvalidDataError = require('../utils/errors/invalid-data-error');

const { OK_STATUS, CREATED_STATUS } = require('../utils/constants');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(OK_STATUS).send(cards.reverse());
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      res.status(CREATED_STATUS).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InvalidDataError(err.message));
        return;
      }

      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('карточка не найдена'))
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('карточка принадлежит другому пользователю');
      }

      return card.remove();
    })
    .then(() => {
      res.status(OK_STATUS).send({ message: 'карточка успешно удалена' });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
    },
  )
    .orFail(new NotFoundError('карточка не найдена'))
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(OK_STATUS).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InvalidDataError(err.message));
        return;
      }

      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
    },
  )
    .orFail(new NotFoundError('карточка не найдена'))
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(OK_STATUS).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InvalidDataError(err.message));
        return;
      }

      next(err);
    });
};
