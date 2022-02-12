const router = require('express').Router();

const {
  updateUserInfoValidator,
  updateUserAvatarValidator,
} = require('../utils/middlewares/validators/users');

const {
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', updateUserInfoValidator, updateUserInfo);
router.patch('/me/avatar', updateUserAvatarValidator, updateUserAvatar);

module.exports = router;
