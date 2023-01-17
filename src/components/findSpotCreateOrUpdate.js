const Spot = require('../models/Spot');

module.exports = (spotUpd, department, user) => {
  return Spot.findOne({
    name: spotUpd.name,
    department: department._id,
    user: user._id,
    period: { from: department.period.from }, // проверяем по полю даты "с - from", если такого нет значит надо создавать новый объект, каждый новый объект Спот отличается только по этому полю
  }).then((spot) => {
    if (!spot) {
      // если спота нет, то создаем
      return Spot.create({
        // при создании нового спота, его id надо внести в объект юзер, поэтому возвращаем новый объект
        ...spotUpd,
        department: department._id,
        user: user._id,
        period: department.period,
      });
    }
    if (spot.hour !== spotUpd.hour) {
      // если спот есть, свойство объекта hour изменилось, значит есть изменения и их надо внести в БД
      Spot.findByIdAndUpdate(spot._id, {
        ...spotUpd,
        period: department.period,
      });
      return;
    }
    return;
  });
};
