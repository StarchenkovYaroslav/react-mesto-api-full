require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const errorHandler = require('./utils/middlewares/error-handler');
const { errorLogger, requestLogger } = require('./utils/middlewares/logger');

const routs = require('./routes');

const { PORT, DB_ADDRESS } = require('./config');

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(requestLogger);

app.use(routs);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
