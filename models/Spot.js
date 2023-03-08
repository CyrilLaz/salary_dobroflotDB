const dayjs = require('dayjs');
const mongoose = require('mongoose');

const spotSchema = mongoose.Schema(
  {
    period: {
      from: { type: Date, expires: 60 * 60 * 24 * 365 * 3 },
      till: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'department',
    },
    name: String,
    ktu: Number,
    hours: Number,
    accrual: Number,
    bonus: Number,
    fine: Number,
  },
  { versionKey: false }
);

spotSchema.statics.findByUserIdAndDate = function (userId, { from, till }) {
  return this.find({
    user: userId,
    'period.from': { $gte: from, $lte: till },
  }).populate({
    path: 'department',
    select: '-period -_id',
  }).select('-user -_id');
};

spotSchema.statics.findByUserIdMakeArrDateAndLastSpot = function (userId) {
  return this.find({ user: userId })
    .populate({
      path: 'department',
      select: '-period',
    })
    .then((spots) => {
      const spotMonthArray = spots
        .reduce((prev, spot) => {
          //исключаем из массива одинаковые даты
          const date = dayjs(spot.period.from).format('YYYY-MM');

          if (!prev.includes(date)) {
            prev.push(date);
            return prev;
          }
          return prev;
        }, [])
        .sort((before, after) => {
          return new Date(before + '-01') - new Date(after + '-01');
        });

      const lastSpot = spots.filter((spot) => {
        let month = spot.period.from.getMonth() + 1;
        const year = spot.period.from.getFullYear();
        if (month <= 9) {
          month = `0${month}`;
        }
        return (year + '-' + month).includes(
          spotMonthArray[spotMonthArray.length - 1]
        );
      });
      return [spotMonthArray, lastSpot];
    });
};

spotSchema.statics.createOrUpdate = async function (spotUpd, department, user) {
  const spot = await this.findOne({
    name: spotUpd.name,
    department: department._id,
    user: user._id,
    'period.from': department.period.from, // проверяем по полю даты "с - from", если такого нет значит надо создавать новый объект, каждый новый объект Спот отличается только по этому полю
  });
  if (!spot) {
    // если спота нет, то создаем
    return await this.create({
      // при создании нового спота, его id надо внести в объект юзер, поэтому возвращаем новый объект
      ...spotUpd,
      department: department._id,
      user: user._id,
      period: department.period,
    });
  }
  if(user._id==='63ee2a569aa891440eeaa492') {
    console.log('spot:',spot);
    console.log('spotUpd:',spotUpd);
  }
  console.log();
  if (spot.hours < spotUpd.hours) {
    //если спот есть, значение свойств hour изменилось, значит есть изменения и их надо внести в БД
    await this.findByIdAndUpdate(spot._id, {
      ...spotUpd,
      period: department.period,
    });
    return;
  }
  return;
};

module.exports = mongoose.model('spot', spotSchema);
