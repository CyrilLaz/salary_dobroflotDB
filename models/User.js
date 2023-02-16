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
  },
  { versionKey: false, timestamps: true }
);
userSchema.index({ "updatedAt": 1 }, { expireAfterSeconds: 60*60*24*365*3 }); // время жизни между обновлениями юзера

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
  // console.log(name, password);
  return this.findOne({ name })
    .select('+password')
    .then((user) => {
      // console.log(user);
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
