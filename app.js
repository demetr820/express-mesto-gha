const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const handleErrors = require('./middlewares/handleErrors');
const routes = require('./routes');
const { PORT, DB_ADDRESS, LOCALHOST } = require('./config');
require('dotenv').config();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
const app = express();

app.use(apiLimiter);
app.use(helmet());
app.use(cors({ origin: `${LOCALHOST}:${PORT}` }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});
app.use(routes);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // console.log(`Server running at ${LOCALHOST}:${PORT}/`);
});
