const express = require('express');
const router = express.Router();
const { getTickerData } = require('../controllers/tickerController');

router.get('/:ticker', getTickerData);

module.exports = router;
