require('dotenv').config();
const express = require('express');
const fs = require('fs');
const dayjs = require('dayjs');
const path = require('path');
const app = express();

const uploadArchive = require('./controllers/uploadArchive')

const { PORT = 3032 } = process.env;

app.post('/upload', uploadArchive);

app.listen(PORT, () => {
  console.log(`Запущен сервер на порте ${PORT}`);
});
