const Department = require('../models/Department');
const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = async (obj, departments) => {
    const period = obj.period;

    const dep = await Department.createOrUpdate(departments, period);
    if (!dep) return; // если dep==underfined -  файл не имеет новой информации, можно его пропустить

    const arrayDepartment = obj.createArray();
    arrayDepartment.forEach(async (el) => {
      /* разбираем объект - создаем пользователя если его нет, 
          и создаем документ спота или изменяем его если он есть
      */
      const user = await User.findOrCreate(el.name);
      el.spots.forEach(async (spt) => {
        // console.log(spt);
        await Spot.createOrUpdate(spt, dep, user);
      });
    });
};
