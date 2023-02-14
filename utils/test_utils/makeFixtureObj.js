// обновление базы за весь прошлый месяц
const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');
const object = [
  {
    name: 'Аат Сагести',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (ин.рабочие)',
        ktu: 0.87,
        hours: 19.5,
        accrual: 1871.32,
        bonus: 0,
        fine: 455.79,
      },
    ],
  },
  {
    name: 'Абдуахадов Мухаммадюсуф Сафодулла Угли',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (русские)',
        ktu: 0.66,
        hours: 154.75,
        accrual: 36921.18,
        bonus: 0,
        fine: 6310.7,
      },
      {
        spot: 'Санитарный участок (КЗ)',
        ktu: 1,
        hours: 5.5,
        accrual: 861.12,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Абдувохидова Бахтинисо Шодиёр Кизи',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (русские)',
        ktu: 1.24,
        hours: 168.25,
        accrual: 78190.61,
        bonus: 0,
        fine: 11962.43,
      },
      {
        spot: 'Санитарный участок (КЗ)',
        ktu: 1,
        hours: 5.5,
        accrual: 861.12,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Абдуллаев Ойбек Зохиржон Угли',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (русские)',
        ktu: 0.54,
        hours: 47,
        accrual: 8985.73,
        bonus: 0,
        fine: 1484.73,
      },
      {
        spot: 'Участок ученический (ручная разделка)',
        ktu: 1.06,
        hours: 22.25,
        accrual: 3311.84,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Абдуллаев Эмилбек Соибжон Угли',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (русские)',
        ktu: 0.54,
        hours: 6,
        accrual: 1054.59,
        bonus: 0,
        fine: 130.89,
      },
    ],
  },
  {
    name: 'Абдурахимов Акмалжон Махамматович',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Заточка ножей ',
        ktu: 0.97,
        hours: 167.5,
        accrual: 26188.11,
        bonus: 0,
        fine: 230,
      },
      {
        spot: 'Разделка ручная (русские)',
        ktu: 1.38,
        hours: 7,
        accrual: 3557.84,
        bonus: 0,
        fine: 671.39,
      },
      {
        spot: 'Санитарный участок (КЗ)',
        ktu: 1,
        hours: 5.5,
        accrual: 861.12,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Абдурахимов Зайниддинхон Акмалжон Угли',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Ликвидный',
        ktu: 0.97,
        hours: 26.5,
        accrual: 6426.92,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Ликвидный (морская капуста)',
        ktu: 1,
        hours: 1,
        accrual: 1094.38,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Разделка ручная (русские)',
        ktu: 1.24,
        hours: 115.55,
        accrual: 49713.89,
        bonus: 0,
        fine: 7774.88,
      },
      {
        spot: 'Санитарный участок (КЗ)',
        ktu: 1,
        hours: 5.5,
        accrual: 861.12,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Абдурахмонов Абдурахмон Тургунович',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Подача банкотары',
        ktu: 0.8,
        hours: 12,
        accrual: 1232.28,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Абдурахмонов Шахзод Мухиддин Угли',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Подача банкотары',
        ktu: 0.8,
        hours: 12,
        accrual: 1232.28,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Участок доработки (русские)',
        ktu: 0.9,
        hours: 9,
        accrual: 1843.97,
        bonus: 0,
        fine: 210.94,
      },
    ],
  },
  {
    name: 'Агаркова Людмила Сергеевна',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Участок доработки (морская капуста)',
        ktu: 1,
        hours: 12,
        accrual: 2576.53,
        bonus: 0,
        fine: 159.52,
      },
    ],
  },
  {
    name: 'Агус Панусунан Сирегар',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (ин.рабочие)',
        ktu: 1.07,
        hours: 31.5,
        accrual: 4134.66,
        bonus: 0,
        fine: 542.49,
      },
    ],
  },
  {
    name: 'Агус Триаван',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (ин.рабочие)',
        ktu: 0.93,
        hours: 31.5,
        accrual: 3491.71,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Аде Дви Прасетян',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (ин.рабочие)',
        ktu: 1.2,
        hours: 38.25,
        accrual: 6047.86,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Санитарный участок (ин.рабочие)',
        ktu: 1,
        hours: 5,
        accrual: 649.76,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Аде Риан Сапутро',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (ин.рабочие)',
        ktu: 0.71,
        hours: 33,
        accrual: 2614.66,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Азаматов Павел Иванович',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Участок закатки',
        ktu: 1,
        hours: 167.5,
        accrual: 73829.39,
        bonus: 0,
        fine: 3904.69,
      },
      {
        spot: 'участок Закатки (морская капуста)',
        ktu: 1,
        hours: 6,
        accrual: 5606.24,
        bonus: 0,
        fine: 104.28,
      },
      {
        spot: 'Участок Тех.Регламента',
        ktu: 1,
        hours: 5.5,
        accrual: 1456.48,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Алди Дви Сапутра',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (ин.рабочие)',
        ktu: 1.12,
        hours: 38.25,
        accrual: 5049.61,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Санитарный участок (ин.рабочие)',
        ktu: 1,
        hours: 5,
        accrual: 649.88,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Алди Сетиаван',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (ин.рабочие)',
        ktu: 0.96,
        hours: 27,
        accrual: 3166.96,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Санитарный участок (ин.рабочие)',
        ktu: 0.75,
        hours: 14,
        accrual: 1653.21,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Алиева Мадина Гофуровна',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Участок доработки (русские)',
        ktu: 1,
        hours: 15.5,
        accrual: 3331.02,
        bonus: 0,
        fine: 127.03,
      },
    ],
  },
  {
    name: 'Алимжонова Райхонбу Ахмадовна',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (русские)',
        ktu: 1.08,
        hours: 9,
        accrual: 3411.79,
        bonus: 0,
        fine: 535.01,
      },
    ],
  },
  {
    name: 'Алишерова Бахора Алишер Кизи',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (русские)',
        ktu: 0.66,
        hours: 155.25,
        accrual: 35861.76,
        bonus: 0,
        fine: 6195.05,
      },
      {
        spot: 'Санитарный участок (КЗ)',
        ktu: 1,
        hours: 5.5,
        accrual: 861.12,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Участок ученический (ручная разделка)',
        ktu: 0.81,
        hours: 12,
        accrual: 1647.66,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Альмешова Александра Куангалиевна',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (русские)',
        ktu: 1.07,
        hours: 123.25,
        accrual: 48698.88,
        bonus: 0,
        fine: 7849.02,
      },
      {
        spot: 'Санитарный участок (КЗ)',
        ktu: 1,
        hours: 5.5,
        accrual: 861.12,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Анди Прахара',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (ин.рабочие)',
        ktu: 1.16,
        hours: 26,
        accrual: 3577.45,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Участок доработки (ин.рабочие)',
        ktu: 1,
        hours: 6,
        accrual: 1003.78,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Андросова Анна Валерьевна',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Ликвидный',
        ktu: 1,
        hours: 109,
        accrual: 32671.01,
        bonus: 0,
        fine: 500,
      },
      {
        spot: 'Ликвидный (морская капуста)',
        ktu: 1,
        hours: 3.5,
        accrual: 4198.32,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Подача банкотары',
        ktu: 1,
        hours: 2.75,
        accrual: 458.9,
        bonus: 0,
        fine: 500.92,
      },
      {
        spot: 'Санитарный участок (КЗ)',
        ktu: 1,
        hours: 4,
        accrual: 626.27,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Участок ориентации банки ',
        ktu: 1,
        hours: 12,
        accrual: 3191.51,
        bonus: 0,
        fine: 6.91,
      },
    ],
  },
  {
    name: 'Аносова Анастасия Александровна',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (русские)',
        ktu: 0.75,
        hours: 10.2,
        accrual: 2420.69,
        bonus: 0,
        fine: 378.08,
      },
    ],
  },
  {
    name: 'Антонова Марина Николаевна',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Санитарный участок (ФСИН)',
        ktu: 1,
        hours: 5.5,
        accrual: 713.53,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Участок доработки (соус) (ФСИН)',
        ktu: 1,
        hours: 22,
        accrual: 3679.42,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Участок доработки (ФСИН)',
        ktu: 1,
        hours: 66.5,
        accrual: 11165.78,
        bonus: 0,
        fine: 689.79,
      },
      {
        spot: 'Участок простоя (ФСИН)',
        ktu: 1,
        hours: 2,
        accrual: 264.82,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Ахадов Музаффар Абдуллаевич',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (русские)',
        ktu: 0.3,
        hours: 12,
        accrual: 1104.22,
        bonus: 0,
        fine: 241.33,
      },
      {
        spot: 'Санитарный участок (КЗ)',
        ktu: 1,
        hours: 5.5,
        accrual: 861.12,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Участок закатки',
        ktu: 1,
        hours: 149.75,
        accrual: 37286.54,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Участок простоя',
        ktu: 1,
        hours: 0.75,
        accrual: 117.29,
        bonus: 0,
        fine: 0,
      },
    ],
  },
  {
    name: 'Ахмад Ефенди',
    period: {
      from: '2022-09-30T14:00:00.000Z',
      till: '2022-10-29T14:00:00.000Z',
    },
    spots: [
      {
        spot: 'Разделка ручная (ин.рабочие)',
        ktu: 1.27,
        hours: 38.25,
        accrual: 6241.77,
        bonus: 0,
        fine: 0,
      },
      {
        spot: 'Санитарный участок (ин.рабочие)',
        ktu: 1,
        hours: 5,
        accrual: 649.88,
        bonus: 0,
        fine: 0,
      },
    ],
  },
];

const makeFileFrom = function (obj, fileName) {
  fs.writeFileSync(
    path.resolve('./fixture') + '/' + fileName + '.json',
    JSON.stringify(obj)
  );
  console.log(fileName + '.json', ' - file ready');
};

function NewDates(from,till) {
  this.dateFrom = new Date(from);
  this.dateTill = new Date(till);

  this.setDate = (from, till) => {
    this.dateFrom = new Date(from);
    this.dateTill = new Date(till);
  };
  this.getDate = () => {
    return { from: this.dateFrom, till: this.dateTill };
  };
  this.getFormatDate = () => {
    return {
      from: dayjs(this.dateFrom).format('DD.MM.YYYY'),
      till: dayjs(this.dateTill).format('DD.MM.YYYY'),
    };
  };
}

(function () {
  const date = new NewDates();
let t = 1;
  date.setDate('1,1,2023', '1,30,2023');

  const newObj = object.map((el) => {
    const obj = { ...el };
    obj.period = date.getDate();
    obj.spots = el.spots.map(
      (spot) =>
        (spot = {
          name:spot.spot,
          ktu:spot.ktu,
          hours: spot.hours / t,
          accrual: spot.accrual / t,
          bonus: spot.bonus / t,
          fine: spot.fine / t,
        })
    );
    return obj;
  });
  makeFileFrom(newObj, date.getFormatDate().from+'-'+date.getFormatDate().till);
  // console.log(newObj[0]);
})();

