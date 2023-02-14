const mongoose = require('mongoose');
// const { connectDB, dropDB, dropCollections } = require("../utils/setuptestdb");

const obj = require('../fixtures/objUpdate');
const Department = require('../models/Department');
const Spot = require('../models/Spot');
const User = require('../models/User');
const objectHandle = require('../utils/objectHandle');

jest.setTimeout(100000);

beforeAll(() => {
  mongoose.connect('mongodb://localhost:27017/test', {});
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  mongoose.disconnect();
});

afterEach(async () => {
  await new Promise((er) => setTimeout(er, 2000));
});

describe('Внесение данных в базу данных 01_01_2023_15, за пол месяца', () => {
  beforeAll(() => {
    return objectHandle(obj.obj_01_01_2023_15, {
      name: 'Консервное производство',
      brigade: 1,
    });
  });

  it('проверка записи департамента в БД ', async () => {
    const result = await Department.find({});
    expect(result.length > 0).toBeTruthy();
    expect(result[0].name).toBe('Консервное производство');
    expect(result[0].brigade).toBe(1);
    expect(result[0].period.from.getTime()).toBe(
      new Date('01,01,2023').getTime()
    );
    expect(result[0].period.till.getTime()).toBe(
      new Date('01,15,2023').getTime()
    );
  });
  it('проверка записи спота в БД ', async () => {
    const result = await Spot.find({});
    // expect(result.length === 56).toBeTruthy();
    expect(result.length).toBe(56);

    expect(typeof result[0].name).toBe('string');
    expect(typeof result[0].ktu).toBe('number');
    expect(typeof result[0].hours).toBe('number');
    expect(typeof result[0].accrual).toBe('number');
    expect(typeof result[0].bonus).toBe('number');
    expect(typeof result[0].fine).toBe('number');
    expect(typeof result[0].user).toBeDefined();

    expect(result[0].period.from.getTime()).toBe(
      new Date('01,01,2023').getTime()
    );
    expect(result[0].period.till.getTime()).toBe(
      new Date('01,15,2023').getTime()
    ); // за пол месяца
  });
  it('проверка записи пользователя в БД ', async () => {
    const result = await User.find({}).select('+password');
    expect(result.length > 0).toBeTruthy();

    expect(result[0].createdAt instanceof Date).toBeTruthy();
    expect(result[0].updatedAt instanceof Date).toBeTruthy();

    expect(typeof result[0].name).toBe('string');
    expect(typeof result[0].password).toBe('string');
  });

  it('Проверка корректности записанных данных в Spot', async () => {
    const user = await User.findOne({
      name: 'Абдуахадов Мухаммадюсуф Сафодулла Угли',
    });
    expect(!!user).toBeTruthy();

    const spot = await Spot.find({ user: user._id });
    expect(!!spot).toBeTruthy();

    expect(spot.length === 2).toBeTruthy();

    expect(spot).toMatchObject([
      {
        name: 'Разделка ручная (русские)',
        ktu: 0.66,
        hours: 77.375,
        accrual: 18460.59,
        bonus: 0,
        fine: 3155.35,
      },
      {
        name: 'Санитарный участок (КЗ)',
        ktu: 1,
        hours: 2.75,
        accrual: 430.56,
        bonus: 0,
        fine: 0,
      },
    ]);
  });
});

describe('Обновление данных за месяц 01_01_2023_30, за весь месяц', () => {
  beforeAll(() => {
    return objectHandle(obj.obj_01_01_2023_30, {
      name: 'Консервное производство',
      brigade: 1,
    });
  });

  it('проверка записи департамента в БД ', async () => {
    const result = await Department.find({});

    expect(result[0].period.from.getTime()).toBe(
      new Date('01,01,2023').getTime()
    );
    expect(result[0].period.till.getTime()).toBe(
      new Date('01,30,2023').getTime()
    );
  });

  it('проверка записи спота в БД ', async () => {
    const result = await Spot.find({});
    expect(result.length).toBe(56);

    expect(result[0].period.from.getTime()).toBe(
      new Date('01,01,2023').getTime()
    );
    expect(result[0].period.till.getTime()).toBe(
      new Date('01,30,2023').getTime()
    ); // за пол месяца
  });

  it('Проверка корректности записанных данных в Spot', async () => {
    const user = await User.findOne({
      name: 'Абдуахадов Мухаммадюсуф Сафодулла Угли',
    });
    expect(!!user).toBeTruthy();

    const spot = await Spot.find({ user: user._id });
    expect(!!spot).toBeTruthy();

    expect(spot.length === 2).toBeTruthy();

    expect(spot).toMatchObject([
      {
        name: 'Разделка ручная (русские)',
        ktu: 0.66,
        hours: 154.75,
        accrual: 36921.18,
        bonus: 0,
        fine: 6310.7,
      },
      {
        name: 'Санитарный участок (КЗ)',
        ktu: 1,
        hours: 5.5,
        accrual: 861.12,
        bonus: 0,
        fine: 0,
      },
    ]);
  });
});
