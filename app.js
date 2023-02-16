require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const updateDB = require('./controllers/updateDB');

const cors = require('./middlewares/cors');
const uploadArchive = require('./middlewares/uploadArchive');
const { login } = require('./controllers/user');
const { handlerErrors } = require('./middlewares/errors');
const actualDates = require('./controllers/actualDates');
const routerSpots = require('./routers/routerSpots');
const routerUser = require('./routers/routerUser');

const auth = require('./middlewares/auth');
const {
  PORT = 3032,
  PATH_TO_DATA = 'mongodb://localhost:27017/salary_dobroflot',
} = process.env;

app.use(cors);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set('strictQuery', false);
mongoose.connect(PATH_TO_DATA);

app.post('/upload', uploadArchive, updateDB);
app.get('/dates', actualDates);
app.post('/signin', login);

app.use('/user', auth, routerUser);
app.use('/spots', auth, routerSpots);

app.use(handlerErrors);
// console.log(new Date('2023-01-09T14:00:00.000+00:00').getFullYear());
app.listen(PORT, () => {
  console.log(`Запущен сервер на порте ${PORT}`);
});
