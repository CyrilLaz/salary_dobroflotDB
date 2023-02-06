const mongoose = require('mongoose');

const spotSchema = mongoose.Schema(
  {
    period: { from: {type: Date, expires: 60*60*24*365*3 }, till: Date },
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
  },
  { versionKey: false }
);

spotSchema.statics.CreateOrUpdate = function (spotUpd, department, user) {
  return this.findOne({
    name: spotUpd.name,
    department: department._id,
    user: user._id,
    period: { from: department.period.from }, // проверяем по полю даты "с - from", если такого нет значит надо создавать новый объект, каждый новый объект Спот отличается только по этому полю
  }).then((spot) => {
    if (!spot) {
      // если спота нет, то создаем
      return this.create({
        // при создании нового спота, его id надо внести в объект юзер, поэтому возвращаем новый объект
        ...spotUpd,
        department: department._id,
        user: user._id,
        period: department.period,
      });
    }
    if (spot.hour !== spotUpd.hour) {
      // если спот есть, значение свойств hour изменилось, значит есть изменения и их надо внести в БД
      this.findByIdAndUpdate(spot._id, {
        ...spotUpd,
        period: department.period,
      });
      return;
    }
    return;
  });
};

module.exports = mongoose.model('spot', spotSchema);
