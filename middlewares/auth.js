const jwt = require('jsonwebtoken');

const { SECRET_PASS = '12121adsad' } = process.env;

const UnAuthError = require('../errors/UnAuthError');

module.exports = async (req, res, next) => {
  const { cookies } = req;

  let payload;
  try {
    if (!cookies || !cookies.jwt) throw e;

    const { jwt: token } = cookies;
    payload = jwt.verify(token, SECRET_PASS); // секретный код
  } catch (error) {
    return next(new UnAuthError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};
