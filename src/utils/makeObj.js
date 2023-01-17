const {JSDOM} = require('jsdom');
const fs = require('fs');
// const dayjs = require('dayjs');
const path = require('path');
const {MakeObject} = require('./makeObjectFromDom');
const EmptyError = require('../errors/EmptyError');

function makeObj(html) {
    try {
        const pageHtml = fs.readFileSync(
    path.resolve('.temp/'+html),
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