import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TickerPage from "./pages/TickerPage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ticker/:symbol" element={<TickerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
