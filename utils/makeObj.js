const { JSDOM } = require('jsdom');
const fs = require('fs');
// const dayjs = require('dayjs');
const path = require('path');
const { MakeObject } = require('./makeObjectFromDom');
const ManyColumns = require('./readDomManyColumns');

function makeObj(html) {
  try {
    const pageHtml = fs.readFileSync(path.resolve(html), 'utf8');
    // console.log(pageHtml);
    const { document } = new JSDOM(pageHtml).window;

    const obj = new MakeObject(document);

    if (obj.columns.length > 10) return new ManyColumns(obj);

    return obj;
  } catch (error) {
    // console.log(error);
    return;
  }
}

module.exports = makeObj;
