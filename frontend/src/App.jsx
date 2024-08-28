import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { CarbonNeutrality, CarbonCredits, Home, Estimation,CarbonNeutralitySimulator,LandingPage } from "./components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carbonNeutrality" element={<CarbonNeutrality />} />
        <Route path="/carbonNeutralitySimulator" element={<CarbonNeutralitySimulator />} />
        <Route path="/estimation" element={<Estimation />} />
        <Route path="/carbonCredits" element={<CarbonCredits />} />
        <Route path="/landingPage" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
