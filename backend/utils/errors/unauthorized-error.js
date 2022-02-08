const { UNAUTHORIZED_STATUS } = require('../constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);

    this.name = UnauthorizedError;
    this.statusCode = UNAUTHORIZED_STATUS;
  }
}

module.exports = UnauthorizedError;
