const router = require('express').Router();

const tokenRouter = require('./token');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const NotFoundError = require('../utils/errors/not-found-error');
const { loginValidator, createUserValidator } = require('../utils/middlewares/validators/users');
const { login, createUser, logOut } = require('../controllers/users');
const auth = require('../utils/middlewares/auth');

router.use('/token', tokenRouter);

router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('/signout', logOut);

router.use(() => {
  throw new NotFoundError('страница не найдена');
});

module.exports = router;
