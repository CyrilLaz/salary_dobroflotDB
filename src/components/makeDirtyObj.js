const path = require('path');
const scrapHtml = require('../components/scraping');
const departmentSchema = require('../constants/departmentSchema')
const refactor = require('./object-maker-array');
const { Refactor } = refactor;


async function makeDirtyObj() {
  let n = 0;
  const objectsArray = [];
  for (i = 1; i <= 14; i++) {
    // console.log(i);
    try {
      console.log(i);
      objectsArray.push(
        new Refactor(
          scrapHtml.getDom(`/page${i}.html`),
          departmentSchema[n]
          ).createObject()
          );
          n++;
        
    } catch {
      console.log({n:n,i:i});
    }
  }

  return objectsArray.reduce((prev, el) => prev.concat(el), []);
}
//создание грязного файла

//const array = new Refactor(scrapHtml.getDom(`/page1.html`)).createObject()

//console.log(array);
makeDirtyObj().then((res) => makeFileFrom(res, 'dirtyObjArray'));
