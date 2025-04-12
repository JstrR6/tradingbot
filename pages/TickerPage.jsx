import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TickerPage() {
  const { symbol } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://jstrfinance.onrender.com/api/tickers/${symbol}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [symbol]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!data) return <div className="p-4 text-red-500">Error loading data.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{symbol}</h1>

      <table className="w-full text-left mb-6">
        <thead>
          <tr>
            <th>Date</th>
            <th>Close</th>
            <th>Signal</th>
          </tr>
        </thead>
        <tbody>
          {data.historicalData.slice(-20).reverse().map((item, idx) => (
            <tr key={item.t}>
              <td>{new Date(item.t).toLocaleDateString()}</td>
              <td>${item.c.toFixed(2)}</td>
              <td className="capitalize">
                {data.signals.slice(-20).reverse()[idx].signal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
