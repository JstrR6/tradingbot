import { useState } from "react";

export default function TickerSearch({ setTicker }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTicker(input.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex">
      <input
        type="text"
        placeholder="Enter ticker (e.g., AAPL)"
        className="px-4 py-2 rounded shadow flex-1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded shadow">
        Fetch
      </button>
    </form>
  );
}
