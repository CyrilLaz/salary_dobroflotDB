const router = require('express').Router();
const { getUserData } = require('../controllers/user');

router.get('/',getUserData);

module.exports = router;