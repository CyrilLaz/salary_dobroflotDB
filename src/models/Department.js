const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema(
  {
    name: String,
    brigade: Number,
    period: { from: Date, till: Date },
  },
  { versionKey: false }
);

module.exports = mongoose.model('department', departmentSchema);
