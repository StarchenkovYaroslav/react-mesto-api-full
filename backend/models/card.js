const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return /^https?:\/\/(www.)?[\w\-.~:/?#[\]@!$&'()*+,;=]+#?$/.test(link);
      },
      message: 'некорректный путь к изображению',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, { versionKey: false });

cardSchema.post('save', (doc, next) => {
  doc.populate(['owner', 'likes'])
    .then(() => {
      next();
    })
    .catch(next);
});

module.exports = mongoose.model('card', cardSchema);
