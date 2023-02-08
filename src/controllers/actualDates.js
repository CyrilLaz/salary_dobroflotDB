const Department = require('../models/Department');

module.exports = (req, res, next) => {
  return Department.find({})
    .select('-_id')
    .then((deps) => {
      if (!deps) {
        return next(new Error());
      }
      return res.send(deps);
    });
};
