const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const NotFoundError = require('../utils/errors/not-found-error');
const UnauthorizedError = require('../utils/errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(avatar) {
        return /^https?:\/\/(www.)?[\w\-.~:/?#[\]@!$&'()*+,;=]+#?$/.test(avatar);
      },
      message: 'некорректный путь к изображению',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(new NotFoundError('пользователь с таким email не найден'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((isPasswordMatched) => {
        if (!isPasswordMatched) {
          return Promise.reject(new UnauthorizedError('неверный пароль'));
        }

        return user;
      }));
}

userSchema.set('toJSON', {
  transform(doc, ret) {
    const result = { ...ret };
    delete result.password;
    return result;
  },
});

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
