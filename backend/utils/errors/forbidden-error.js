const { FORBIDDEN_STATUS } = require('../constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    this.name = ForbiddenError;
    this.statusCode = FORBIDDEN_STATUS;
  }
}

module.exports = ForbiddenError;
