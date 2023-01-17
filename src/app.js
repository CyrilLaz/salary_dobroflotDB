require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const fs = require('fs');
const dayjs = require('dayjs');
const path = require('path');
const app = express();
// const compareDepartment = require('./middlewares/comparePeriod')
const updateDB = require('./middlewares/updateDB');
// const comparePeriod = require('./middlewares/comparePeriod');
const uploadArchive = require('./controllers/uploadArchive')

const { PORT = 3032 } = process.env;

mongoose.connect('mongodb://localhost:27017/salary_dobroflot');
// comparePeriod();
updateDB();

app.post('/upload', uploadArchive);


app.listen(PORT, () => {
  console.log(`Запущен сервер на порте ${PORT}`);
});
