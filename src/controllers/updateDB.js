const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Department = require('../models/Department');
const Spot = require('../models/Spot');

const makeObj = require('../utils/makeObj');
const unzip = require('../utils/unzip');

const EmptyError = require('../errors/EmptyError');
const departments = require('../constants/departments');

async function updateDB(filePath, req, res, next) {
  console.log('#');
  // await unzip(filePath).then(console.log);
  const dir = path.resolve('.temp');
  let countDep = 0,
    countUser = 0;

  try {
    const files = await unzip(filePath).then((fileArray) =>
      fileArray.sort((a, b) => /\d\d?/.exec(a) - /\d\d?/.exec(b))
    );

    for (i = 0; i <= 13; i++) {
      const obj = makeObj(files[i]);
      if (obj) {
        const period = obj.period;
        const dep = await Department.createOrUpdate(departments[i], period);
        if (!dep) continue; // если dep==underfined -  файл не имеет новой информации, можно его пропустить
        countDep++;
        const arrayDepartment = obj.createArray();
        arrayDepartment.forEach(async (el) => {
          /* разбираем объект - создаем пользователя если его нет, 
              и создаем документ спота или изменяем его если он есть
          */
          const user = await User.findOrCreate(el.name);
          countUser++;
          el.spots.forEach(async (spt) => {
            await Spot.сreateOrUpdate(spt, dep, user);
            // if (spot) {
            //   await User.findByIdAndUpdate(user._id, {
            //     $addToSet: { spots: spot._id },
            //   });
            // }
          });
        });
      }
    }
    // fs.rmdirSync(dir,(err)=console.log(err))
  } catch (err) {
    return next(err);
  } finally {
    if(countDep==0&&countUser==0){
      return res.status(400).send({message:'Ничего нового!'});
    }
    return res.send({message:`Обновлено департаментов: ${countDep} Обновлено записей пользователя: ${countUser}`});
  }
}

module.exports = updateDB;
