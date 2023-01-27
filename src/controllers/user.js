require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const { SECRET_PASS = '12121adsad' } = process.env;

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
  // console.log(req.body);
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
      const spotPeriodArray = user.spots
        .reduce((prev, spot) => {
          //исключаем из массива одинаковые даты
          const dateInMseconds = spot.period.from.getTime();

          if (!prev.includes(dateInMseconds)) {
            prev.push(dateInMseconds);
            return prev;
          }
          return prev;
        }, [])
        // .map(elem=>elem.period.from)
        .sort((before, after) => before - after);

        const lastSpot = user.spots.filter(spot=>spot.period.from.getTime()===spotPeriodArray[spotPeriodArray.length-1])
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7, // надо ли ограничение по времени??!
          httpOnly: true,
          sameSite: true,
        })
        .send({
          data: {
            // ...user,
            name:user.name,
            spot: lastSpot,
            password: undefined,
            datesSpotInMsecond: spotPeriodArray,
          },
        });
    })
    .catch(next);
};

module.exports = { findUserById, login };
