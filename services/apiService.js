const axios = require('axios');

const getHistoricalData = async (ticker, from, to) => {
  const API_KEY = process.env.POLYGON_API_KEY;
  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?apiKey=${API_KEY}`;

  try {
    const res = await axios.get(url);
    return res.data.results;
  } catch (error) {
    console.error('Polygon API Error:', error.message);
    return null;
  }
};

module.exports = { getHistoricalData };
