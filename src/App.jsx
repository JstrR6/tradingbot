import { useState } from "react";
import TickerSearch from "./components/TickerSearch";
import TickerData from "./components/TickerData";

export default function App() {
  const [ticker, setTicker] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Trading Bot Viewer</h1>
        <TickerSearch setTicker={setTicker} />
        {ticker && <TickerData ticker={ticker} />}
      </div>
    </div>
  );
}
