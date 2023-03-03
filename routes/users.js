const router = require('express').Router();

const {
  getUsers,
  getUser,
  getMe,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUser);

router.get('/me', getMe);

router.post('/', createUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
