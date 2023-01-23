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

module.exports = findUserById;
