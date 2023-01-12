const express = require('express');
const mongoose = require('mongoose');
const User = require('../schemas/User');
const Spot = require('../schemas/Spot');
const Department = require('../schemas/Department');
const url = 'mongodb://localhost:27017/salary';

var zlib = require('zlib');
var fs = require('fs');
const file = require('../../archive/pages.zip')

function unzipFiles(file) {
//   var gzip = zlib.createGzip();
//   var inp = fs.createReadStream('../../archive/pages.zip');
//   var out = fs.createWriteStream('input.txt.gz');

//   inp.pipe(gzip).pipe(out);

const buffer = fs.readFile('../../archive/pages.zip');
//  console.log(buffer);
}


function createUser(user) {}

function createSpot(spot) {}

function updateSpot(spot) {}

function createDepartment(depar) {}

function isUpdateFile(file, date) {}

function main() {
  mongoose.set('strictQuery', false);
  mongoose.connect(url).then(
    (res) => {
      if (res) console.log('Connect to DB: ', url);
    },
    (err) => {
      console.log(err);
    }
  );
}

// main();

// распоковать архив с файлами
// проверить первый файл с датой из базы данных
