const dayjs = require('dayjs');
const Spot = require('../models/Spot');

module.exports.findSpots = (req, res, next) => {
  //user
  // 2022-10 нужна обязательно валидация !!!!!
  const { from, till } = req.params;
  const userId = req.user;

  const firstDay = dayjs(from.split('-'));
  const finalDay = till
    ? dayjs(till.split('-')).endOf('month')
    : dayjs(from.split('-')).endOf('month');

  return Spot.findByUserIdAndDate(userId, {
    from: firstDay,
    till: finalDay,
  }).then((spots) => res.send(spots));
};

module.exports.getSpotAndDates = (req, res, next) => {
  return Spot.findByUserIdMakeArrDateAndLastSpot(req.user._id)
    .then(([arr, lastSpot]) => {
      res.send({
        data: {
          spot: lastSpot,
          spotMonthArray: arr,
        },
      });
    })
    .catch(next);
};
