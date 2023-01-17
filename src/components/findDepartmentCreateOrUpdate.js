// const mongoose = require('mongoose');
const Department = require('../models/Department');

module.exports = (department, period) => {

 return Department.findOne(department)
    .then((dep) => {
      if (!dep) {
      return Department.create({...department,period});
      }
      if (
        dep.period.from.getTime() == period.from.getTime() &&
        dep.period.till.getTime() == period.till.getTime()
      ) {
        console.log(
          'подавай следующий файл, тут ничего интерестного'
        ); /*что делать при совпадении, проверяем следующий файл как бы */
        return ;
      }
      console.log('тут надо поподробнее поглядеть');
      return Department.findByIdAndUpdate(dep._id,{period},{new:true},)
    });
};
