const express = require('express');
const router = express.Router();

const { getTickerData } = require('../controllers/tickerController');

// Existing route for fetching specific ticker
router.get('/:ticker', getTickerData);

// New route to get all tickers
router.get('/all', async (req, res) => {
  const tickers = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corp' },
    { symbol: 'NVDA', name: 'NVIDIA Corp' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'META', name: 'Meta Platforms Inc.' },
    { symbol: 'GOOG', name: 'Alphabet Inc.' },
    { symbol: 'NFLX', name: 'Netflix Inc.' },
    // you can add more or fetch dynamically later
  ];

  res.json(tickers);
});

module.exports = router;
