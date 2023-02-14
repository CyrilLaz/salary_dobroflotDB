const mongoose = require('mongoose');
// const { connectDB, dropDB, dropCollections } = require("../utils/setuptestdb");

const obj = require('../fixtures/objUpdate');
const Department = require('../models/Department');
const Spot = require('../models/Spot');
const User = require('../models/User');
const objectHandle = require('../utils/objectHandle');
// jest.useFakeTimers();
// jest.testEnvironment('node');
jest.setTimeout(100000);
// try {

//   await objectHandle(obj.obj_01_01_2023_15(),{ name: 'Консервное производство', brigade: 1 });
// } catch (error) {
//   console.log(error);
// }

beforeAll(() => {
  // await connectDB();
  mongoose.connect('mongodb://localhost:27017/test', {});
});

afterAll(async () => {
  // await new Promise((er) => setTimeout(er, 9000));
  // await mongoose.connection.dropDatabase();
  await mongoose.connection.db.dropDatabase();
  // await dropDB();
  mongoose.disconnect();
});

// console.log((obj.obj_01_12_2022_30.period));
describe('Внесение данных в базу данных 01_01_2023_15', () => {
  beforeAll(() => {
    // await mongoose.connect('mongodb://localhost:27017/test');
    return objectHandle(obj.obj_01_01_2023_15, {
      name: 'Консервное производство',
      brigade: 1,
    });
  });
  afterEach(async () => {
    await new Promise((er) => setTimeout(er, 5000));
  });

  it('проверка записи департамента в БД ', async () => {
    const result = await Department.find({});
    await expect(result.length > 0).toBeTruthy();
  });
  it('проверка записи спота в БД ', async () => {
    const result = await Spot.find({});
    await expect(result.length > 0).toBeTruthy();
  });
  it('проверка записи пользователя в БД ', async () => {
    const result = await User.find({});
    await expect(result.length > 0).toBeTruthy();
  });
});
