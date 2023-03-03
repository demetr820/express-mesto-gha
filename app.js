const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');

const { PORT = 3000 } = process.env;
const DB = 'mongodb://localhost:27017/mestodb';
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
const app = express();

app.use(apiLimiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(DB, {
  useNewUrlParser: true,
});
app.use((req, res, next) => {
  req.user = {
    _id: '63fc5a9242fd2bd5cbbe71f3',
  };
  next();
});
app.use(routes);
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
