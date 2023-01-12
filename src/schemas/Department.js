const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String, 
  period: { from: Date, till: Date },
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;