const { NOT_FOUND_STATUS } = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = 'NotFoundError';
    this.statusCode = NOT_FOUND_STATUS;
  }
}

module.exports = NotFoundError;
