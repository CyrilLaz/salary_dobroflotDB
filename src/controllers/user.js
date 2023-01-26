const User = require('../models/User');

const findUserById = (req, res) => {
  User.findById(req.params.id)
    .populate({
      path: 'spots',
    //   match: { from: new Date('2022-09-30T14:00:00.000Z') },
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
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        jwtKey, // секретный код
        { expiresIn: '7d' },
      );
      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ data: { ...user, password: undefined } });
    })
    .catch(next);
};

module.exports = findUserById;
