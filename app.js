const express = require('express');
const cors = require('cors');
const tickerRoutes = require('./routes/tickerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/tickers', tickerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
