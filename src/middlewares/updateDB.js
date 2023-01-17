const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Department = require('../models/Department');
const Spot = require('../models/Spot');

const makeObj = require('../utils/makeObj');
const EmptyError = require('../errors/EmptyError');
const departments = require('../constants/departments');

async function updateDB() {
  const dir = path.resolve('.temp');

  try {
    const files = await new Promise((resolve, reject) => {
      fs.readdir(dir, (err, files) => {
        if (err) {
          reject(new EmptyError(err));
        }
        resolve(files.sort((a, b) => /\d\d?/.exec(a) - /\d\d?/.exec(b)));
      });
    });

    for (i = 0; i <= 13; i++) {
      const obj = makeObj(files[i]);
      //   console.log(period);
      if (obj) {
        const period = obj.period;
        const dep = await Department.CreateOrUpdate(departments[i], period);
        if (!dep) continue;
        const arrayDepartment = obj.createArray();
        arrayDepartment.forEach(async (el) => {
          /* разбираем объект - создаем пользователя если его нет, 
              и создаем документ спота или изменяем его если он есть
          */
          const user = await User.findOrCreate(el.name);
          el.spots.forEach(async (spt) => {
            const spot = await Spot.CreateOrUpdate(spt, dep, user);
            if (spot) {
              await User.findByIdAndUpdate(user._id, { $addToSet: { spots: spot._id } });
            }
          });
        });
      }
    }
  } catch (err) {
    return console.log(err);
  }
}

module.exports = updateDB;
