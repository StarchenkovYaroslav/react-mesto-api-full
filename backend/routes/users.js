const router = require('express').Router();

const {
  getUserByIdValidator,
  updateUserInfoValidator,
  updateUserAvatarValidator,
} = require('../utils/middlewares/validators/users');

const {
  getAllUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserByIdValidator, getUserById);

router.patch('/me', updateUserInfoValidator, updateUserInfo);
router.patch('/me/avatar', updateUserAvatarValidator, updateUserAvatar);

module.exports = router;
