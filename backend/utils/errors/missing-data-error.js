const { BAD_REQUEST_STATUS } = require('../constants');

class MissingDataError extends Error {
  constructor(message) {
    super(message);

    this.name = 'MissingDataError';
    this.statusCode = BAD_REQUEST_STATUS;
  }
}

module.exports = MissingDataError;
