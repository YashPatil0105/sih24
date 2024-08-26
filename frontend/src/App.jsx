import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { CarbonNeutrality, CarbonCredits, Home, Estimation } from "./components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carbonNeutrality" element={<CarbonNeutrality />} />
        <Route path="/estimation" element={<Estimation />} />
        <Route path="/carbonCredits" element={<CarbonCredits />} />
      </Routes>
    </div>
  );
}

export default App;
