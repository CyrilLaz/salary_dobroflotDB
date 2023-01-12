const fs = require('fs');
const dayjs = require('dayjs');
const path = require('path');
const { resolve } = require('path');

const nameFile = `./ymrf_${dayjs(new Date()).format('DD_MM_YYYY')}.zip`;
const dir = './archive';

if (!fs.existsSync(dir)) {
  // проверка наличия папки архива
  fs.mkdirSync(dir);
}

const uploadArchive = (req) => {
  const input = fs.createWriteStream(path.join(path.resolve(dir), nameFile));
  return new Promise((resolve) => {
    req
      .pipe(input)
      .on('finish', () => resolve(fs.statSync(path.join(path.resolve(dir), nameFile))))
      .on('error', (err) => {
        throw new Error('Что то пошло не так при получении архива');
      });
  });
};

module.exports = (req, res, next) => {
  uploadArchive(req)
    .then((stats) => {
      if (stats.size !== 0) {
        res.send({ stats });
        return next();
      } else {
        throw new Error('Что то пошло не так при получении архива');
      }
    })
    .catch((err) =>
      res
        .status(500)
        .send({ err, message: err.message })
    );
};
