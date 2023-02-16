const {JSDOM} = require('jsdom');
const fs = require('fs');
// const dayjs = require('dayjs');
const path = require('path');
const {MakeObject} = require('./makeObjectFromDom');

function makeObj(html) {
    try {
        const pageHtml = fs.readFileSync(
    path.resolve(html),
    'utf8'
  );

  const { document } = new JSDOM(pageHtml).window;

const obj = new MakeObject(document);
return obj
    } catch (error) {
        // console.log(error);
        return;
    }
}

module.exports = makeObj;