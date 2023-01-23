require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const updateDB = require('./middlewares/updateDB');

const uploadArchive = require('./controllers/uploadArchive');
const user = require('./controllers/user');

const {
  PORT = 3032,
  PATH_TO_DATA = 'mongodb://localhost:27017/salary_dobroflot',
} = process.env;

mongoose.set('strictQuery', false);
mongoose.connect(PATH_TO_DATA);

// updateDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/upload', uploadArchive);

app.get('/user/:id', user);
console.log(new Date('2023-01-09T14:00:00.000+00:00').getFullYear());
app.listen(PORT, () => {
  console.log(`Запущен сервер на порте ${PORT}`);
});
