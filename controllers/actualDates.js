const Department = require('../models/Department');

module.exports = (req, res, next) => {
  return Department.find({})
    .select('-_id')
    .then((deps) => {
      if (!deps) {
        return next(new Error());
      }
      const uniqDep = deps.reduce((prev, el) => {
        if (!prev.find((item) => item.name == el.name)) return [...prev, el];
        return prev;
      }, []);

      return res.send({data:uniqDep});
    });
};
