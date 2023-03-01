const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');

const { PORT = 3000 } = process.env;
const DB = 'mongodb://localhost:27017/mestodb';

const app = express();

mongoose.connect(DB, {
  useNewUrlParser: true,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '63fc5a9242fd2bd5cbbe71f3',
  };
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
