const calculateSMA = (data, window) => {
    let sma = [];
    for (let i = 0; i < data.length; i++) {
      if (i < window - 1) {
        sma.push(null);
      } else {
        const windowData = data.slice(i - window + 1, i + 1);
        const sum = windowData.reduce((total, day) => total + day.c, 0);
        sma.push(sum / window);
      }
    }
    return sma;
  };
  
  const generateSignals = (historicalData) => {
    const shortSMA = calculateSMA(historicalData, 5);
    const longSMA = calculateSMA(historicalData, 20);
  
    let signals = [];
    for (let i = 0; i < historicalData.length; i++) {
      if (!shortSMA[i] || !longSMA[i]) {
        signals.push({ date: historicalData[i].t, signal: 'hold' });
      } else if (shortSMA[i] > longSMA[i]) {
        signals.push({ date: historicalData[i].t, signal: 'buy' });
      } else if (shortSMA[i] < longSMA[i]) {
        signals.push({ date: historicalData[i].t, signal: 'sell' });
      } else {
        signals.push({ date: historicalData[i].t, signal: 'hold' });
      }
    }
    return signals;
  };
  
  module.exports = { generateSignals };
  