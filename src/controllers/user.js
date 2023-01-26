const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {SECRET_PASS='12121adsad'} = process.env;


const findUserById = (req, res) => {
  User.findById(req.params.id)
    .populate({
      path: 'spots',
      populate: {
        path: 'department',
      },
    })
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return res.status(404).send('не найден');
    })
    .catch((err) => res.status(500).send(err, 'случилось не предвиденное'));
};

const login = (req, res, next) => {
  const { login, password } = req.body;
console.log(req.body);
  User.findUserByCredentials(login, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_PASS, // секретный код
        { expiresIn: '7d' }
      );
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ data: { ...user, password: undefined } });
    })
    .catch(next);
};

module.exports = {findUserById,login};
