require('dotenv').config();
const User = require('../models/User');

const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const Spot = require('../models/Spot');
const NoExistError = require('../errors/NoExistError');

const { SECRET_PASS = '12121adsad' } = process.env;

const getUserData = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      throw new NoExistError('Такого пользователя не найдено');
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { login, password } = req.body;
  User.findUserByCredentials(login, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_PASS, // секретный код
        { expiresIn: '7d' } // надо ли ограничение по времени??!
      );
      /* нашли пользователя, надо вернуть обратно клиенту :
       * имя пользователя, информацию по последней дате, и список всех дат что есть в базе, отсортированных по возрастанию
       */
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7, // надо ли ограничение по времени??!
          httpOnly: true,
          sameSite: true,
        })
        .send({
          data: {
            name: user.name,
          },
        });
    })
    .catch(next);
};

module.exports = { getUserData, login };
