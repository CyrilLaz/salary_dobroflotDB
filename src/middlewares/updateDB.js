const fs = require('fs');
const path = require('path');
const findDepartmentCreateOrUpdate = require('../components/findDepartmentCreateOrUpdate');
const findSpotCreateOrUpdate = require('../components/findSpotCreateOrUpdate');
const {
  findUserOrCreate,
  findUserAndUpdate,
} = require('../components/findUserCreateOrUpdate');
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
        const dep = await findDepartmentCreateOrUpdate(departments[i], period);
        if (!dep) {
          continue;
        }
        const arrayDepartment = obj.createArray();
        arrayDepartment.forEach(async (el) => {
          /* разбираем объект - создаем пользователя если его нет, 
              и создаем документ спота или изменяем его если он есть
          */
          const user = await findUserOrCreate(el.name);
          el.spots.forEach(async (spt) => {
            const spot = await findSpotCreateOrUpdate(spt, dep, user);
            if (spot) {
              findUserAndUpdate(user._id, { $addToSet: { spots: spot._id } });
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
