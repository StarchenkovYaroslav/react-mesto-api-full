const {
  PORT = 3001,
  DB_ADDRESS = 'mongodb://localhost:27017/mestodb',
  JWT_SECRET = 'jwt_secret',
} = process.env;

const ALLOWED_CORS = [
  'http://localhost:3000',
  'http://mesto.front.nomoredomains.work',
  'https://mesto.front.nomoredomains.work',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  PORT,
  DB_ADDRESS,
  JWT_SECRET,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
