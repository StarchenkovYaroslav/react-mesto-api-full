const router = require('express').Router();

const {
  createCardValidator,
  deleteCardValidator,
} = require('../utils/middlewares/validators/cards');

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', createCardValidator, createCard);
router.delete('/:cardId', deleteCardValidator, deleteCard);

router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
