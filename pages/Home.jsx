import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    axios.get('https://jstrfinance.onrender.com/api/tickers/all')
      .then(res => setTickers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All US Tickers</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tickers.map(ticker => (
          <Link
            to={`/ticker/${ticker.symbol}`}
            key={ticker.symbol}
            className="bg-white p-4 rounded shadow hover:bg-blue-100"
          >
            <h2 className="font-bold">{ticker.symbol}</h2>
            <p className="text-sm">{ticker.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
