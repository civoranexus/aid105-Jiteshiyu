import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Schemes from "./pages/Schemes";
import Disclaimer from "./pages/Disclaimer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Recommendations from "./pages/Recommendations";
import ComparePage from "./pages/ComparePage";
import Watchlist from "./pages/Watchlist";
import Progress from "./pages/Progress";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
