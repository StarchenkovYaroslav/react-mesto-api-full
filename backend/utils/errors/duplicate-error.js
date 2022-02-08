const { CONFLICT_STATUS } = require('../constants');

class DuplicateError extends Error {
  constructor(message) {
    super(message);

    this.name = DuplicateError;
    this.statusCode = CONFLICT_STATUS;
  }
}

module.exports = DuplicateError;
