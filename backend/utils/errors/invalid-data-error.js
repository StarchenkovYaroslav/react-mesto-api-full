const { BAD_REQUEST_STATUS } = require('../constants');

class InvalidDataError extends Error {
  constructor(message) {
    super(message);

    this.name = 'InvalidDataError';
    this.statusCode = BAD_REQUEST_STATUS;
  }
}

module.exports = InvalidDataError;
