const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports.checkToken = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.send({ isValid: false });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return res.send({ isValid: true });
  } catch (err) {
    return res.send({ isValid: false });
  }
};
