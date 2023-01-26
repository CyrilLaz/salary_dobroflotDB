require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const updateDB = require('./controllers/updateDB');
const unzip = require('./utils/unzip');

const uploadArchive = require('./middlewares/uploadArchive');
const user = require('./controllers/user');
// const handlerErrors = require('./middlewares/handlerErrors');
const {
  PORT = 3032,
  PATH_TO_DATA = 'mongodb://localhost:27017/salary_dobroflot',
} = process.env;

mongoose.set('strictQuery', false);
mongoose.connect(PATH_TO_DATA);

app.use(bodyParser.urlencoded({ extended: true }));
app.post('/upload', uploadArchive, updateDB);

app.get('/user/:id', user);

// app.use(handlerErrors);
// console.log(new Date('2023-01-09T14:00:00.000+00:00').getFullYear());
app.listen(PORT, () => {
  console.log(`Запущен сервер на порте ${PORT}`);
});
