const router = require('express').Router();

const {
  getUsers,
  getUser,
  getMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMe);

router.get('/:userId', getUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
