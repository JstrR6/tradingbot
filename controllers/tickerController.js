const { getHistoricalData } = require('../services/apiService');
const { generateSignals } = require('../services/predictionService');
const moment = require('moment');

const getTickerData = async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();

  const toDate = moment().format('YYYY-MM-DD');
  const fromDate = moment().subtract(90, 'days').format('YYYY-MM-DD'); // Last 90 days

  try {
    const historicalData = await getHistoricalData(ticker, fromDate, toDate);
    if (!historicalData) {
      return res.status(400).json({ message: 'No data returned from API.' });
    }

    const signals = generateSignals(historicalData);

    res.json({
      ticker,
      fromDate,
      toDate,
      signals,
      historicalData
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getTickerData };
