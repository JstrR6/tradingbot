import { useEffect, useState } from "react";
import axios from "axios";

export default function TickerData({ ticker }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`https://jstrfinance.onrender.com/api/tickers/${ticker}`);
        setData(res.data);
      } catch (error) {
        setError("Error fetching ticker data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticker]);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">{data.ticker} Data</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-left">Close Price</th>
            <th className="text-left">Signal</th>
          </tr>
        </thead>
        <tbody>
          {data.historicalData.slice(-20).reverse().map((day, idx) => (
            <tr key={day.t}>
              <td>{new Date(day.t).toLocaleDateString()}</td>
              <td>${day.c.toFixed(2)}</td>
              <td>
                {data.signals.slice(-20).reverse()[idx].signal === "buy" && <span className="text-green-600 font-semibold">Buy 🟢</span>}
                {data.signals.slice(-20).reverse()[idx].signal === "sell" && <span className="text-red-600 font-semibold">Sell 🔴</span>}
                {data.signals.slice(-20).reverse()[idx].signal === "hold" && <span className="text-gray-600">Hold ⚪️</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
