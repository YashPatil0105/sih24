import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CarbonNeutrality, CarbonCredits,  Estimation,CarbonNeutralitySimulator,Home} from "./components/pages";

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
        {/* <Route path="/landingPage" element={<LandingPage />} /> */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
