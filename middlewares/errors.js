/* eslint-disable no-unused-vars */
const {
  defaultErrorStatus,
  dataErrorStatus,
  unUniqueStatus,
} = require('../constants/errorStatuses');

const NoExistError = require('../errors/NoExistError');
const EmptyError = require('../errors/EmptyError');
const UncorrectLoginError = require('../errors/UncorrectLoginError');
const UnAuthError = require('../errors/UnAuthError');

module.exports.handlerErrors = (err, req, res, next) => {
  const { statusCode = defaultErrorStatus, message } = err;

  if (err instanceof UncorrectLoginError) {
    return res.status(err.statusCode).send({ message });
  }
  if (err instanceof EmptyError) {
    return res.status(err.statusCode).send({ message });
  }
  if (err instanceof NoExistError) {
    return res.status(err.statusCode).send({ message });
  }
  if (err instanceof UnAuthError) {
    return res.status(err.statusCode).send({ message });
  }

  if (err.name === 'CastError') {
    return res
      .status(dataErrorStatus)
      .send({ message: 'Передан некорректный _id' });
  }
console.log(err);
  return res
    .status(statusCode)
    .send({ message: 'На сервере произошла ошибка' });
};
