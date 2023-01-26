require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UncorrectLoginError = require('../errors/UncorrectLoginError');
const { DEFAULT_PASS = '11223344db' } = process.env;

const userSchema = mongoose.Schema(
  {
    name: String,
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    spots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'spot' }], // надо найти способ для сортировки массива по дате спота, что удобно при запросе
  },
  { versionKey: false }
);

userSchema.statics.findOrCreate = function (name) {
  return this.findOne({ name }).then((user) => {
    if (!user) {
      return Promise.resolve(bcrypt.hash(String(DEFAULT_PASS), 10)).then(
        (hash) => this.create({ name, password: hash })
      );
    }
    return user;
  });
};

userSchema.statics.findAndUpdate = function (id, update) {
  return this.findByIdAndUpdate(id, update, { new: true });
};

userSchema.statics.findUserByCredentials = function (name, password) {
  // попытаемся найти пользователя по почте
  console.log(name, password);
  return this.findOne({ name })
    .select('+password')
    .populate({
      path: 'spots',
      populate: {
        path: 'department',
      },
    })
    .then((user) => {
      console.log(user);
      if (!user) {
        return Promise.reject(
          new UncorrectLoginError('Неправильные почта или пароль')
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UncorrectLoginError('Неправильные почта или пароль')
          );
        }
        return user.toObject();
      });
    });
};

module.exports = mongoose.model('user', userSchema);
