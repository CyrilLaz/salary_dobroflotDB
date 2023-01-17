const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema(
  {
    name: String,
    brigade: Number,
    period: { from: Date, till: Date },
  },
  { versionKey: false }
);

departmentSchema.statics.CreateOrUpdate = function (department, period) {
  return this.findOne(department)
     .then((dep) => {
       if (!dep) {
       return this.create({...department,period});
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
       return this.findByIdAndUpdate(dep._id,{period},{new:true},)
     });
 };
 

module.exports = mongoose.model('department', departmentSchema);
