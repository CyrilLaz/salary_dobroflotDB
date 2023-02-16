const { findSpots, getSpotAndDates } = require('../controllers/spots');

const router = require('express').Router();

router.get('/', getSpotAndDates);
router.get('/:from', findSpots); // запрос одного месяца НАДО ВАЛИДИРОВАТЬ ЗАПРОС
router.get('/:from/:till', findSpots); // запрос промежутка времени НАДО ВАЛИДИРОВАТЬ ЗАПРОС

module.exports = router;
