const handleErrors = (err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({
    message: status === 500 ? 'Возникла ошибка' : message,
  });
  next();
};
module.exports = handleErrors;
