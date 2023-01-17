const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: String,
    login: { type: String, ref: 'name' },
    password: { type: String, default: '11223344' },
    created: {
      type: Date,
      default: Date.now,
    },
    spots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'spot' }], // надо найти способ для сортировки массива по дате спота, что удобно при запросе
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', userSchema);
