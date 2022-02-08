const { INTERNAL_SERVER_ERROR_STATUS } = require('../constants');

function errorHandler(err, req, res, next) {
  const status = err.statusCode || INTERNAL_SERVER_ERROR_STATUS;
  const message = err.message || 'произошла ошибка';

  res.status(status).send({ message });

  next();
}

module.exports = errorHandler;
