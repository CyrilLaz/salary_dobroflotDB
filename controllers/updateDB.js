const fs = require('fs');
const path = require('path');
// const User = require('../models/User');
// const Department = require('../models/Department');
// const Spot = require('../models/Spot');

const makeObj = require('../utils/makeObj');
const unzip = require('../utils/unzip');

// const EmptyError = require('../errors/EmptyError');
const departments = require('../constants/departments');
const objectHandle = require('../utils/objectHandle');

async function updateDB(filePath, req, res, next) {
  // await unzip(filePath).then(console.log);
  const dirTemp = path.resolve('.temp');

  try {
    const files = await unzip(filePath).then((fileArray) =>
      fileArray.sort((a, b) => /\d\d?/.exec(a) - /\d\d?/.exec(b))
    );

    for (i = 0; i <= 13; i++) {
      const obj = makeObj(path.join(dirTemp, files[i]));
      if (obj) {
        await objectHandle(obj, departments[i]);
      }
    }
  } catch (err) {
    return next(err);
  } finally {
    fs.rm(dirTemp, { recursive: true, force: true }, next);
    // if (countDep == 0 && countUser == 0) {
    //   return res.status(400).send({ message: 'Ничего нового!' });
    // }
    // return res.send({
    //   message: `Обновлено департаментов: ${countDep} Обновлено записей пользователя: ${countUser}`,
    // });
  }
}

module.exports = updateDB;
