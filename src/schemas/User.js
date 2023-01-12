const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  login: String,
  password: String,
  created: {
    type: Date,
    default: Date.now,
  },
  departments: Array,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
