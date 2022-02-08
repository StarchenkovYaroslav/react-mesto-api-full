const validator = require('validator');

const InvalidDataError = require('./errors/invalid-data-error');

module.exports.urlValidator = (value) => {
  if (!validator.isURL(value)) {
    throw new InvalidDataError('некорректный email');
  }

  return value;
};
