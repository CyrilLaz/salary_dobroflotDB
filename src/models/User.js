const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: String,
    login: { type: String, ref: 'name' },
    password: { type: String, default: '11223344', select: false },
    created: {
      type: Date,
      default: Date.now,
    },
    spots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'spot' }], // надо найти способ для сортировки массива по дате спота, что удобно при запросе
  },
  { versionKey: false }
);

userSchema.statics.findOrCreate = function (name) {
  return this.findOne({ name }).then((user) => {
    if (!user) {
      return this.create({ name });
    }
    return user;
  });
};

userSchema.statics.findAndUpdate = function (id, update) {
  return this.findByIdAndUpdate(id, update, { new: true });
};
module.exports = mongoose.model('user', userSchema);
