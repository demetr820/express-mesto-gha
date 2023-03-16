const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const validateURL = require('../utils/consts');
const {
  getUsers,
  getUser,
  getMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMe);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUser,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().custom(validateURL),
    }),
  }),
  updateAvatar,
);

module.exports = router;
