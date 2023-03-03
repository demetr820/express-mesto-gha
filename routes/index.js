const router = require('express').Router();
const userRoutes = require('./users');
const cardsRoutes = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', userRoutes);
router.use('/cards', cardsRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Не правильный адрес'));
});
module.exports = router;
