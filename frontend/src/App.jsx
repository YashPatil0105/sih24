import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CarbonNeutrality, CarbonCredits,  Estimation,CarbonNeutralitySimulator,Home, MineData} from "./components/pages";

function App() {
  return (
    <div className="App bg-gradient-to-br from-blue-100 to-green-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carbonNeutrality" element={<CarbonNeutrality />} />
        <Route
          path="/carbonNeutralitySimulator"
          element={<CarbonNeutralitySimulator />}
        />
        <Route path="/estimation" element={<Estimation />} />
        <Route path="/carbonCredits" element={<CarbonCredits />} />
        <Route path="/mineData" element={<MineData />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
// import React, { Suspense, lazy } from "react";
// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import "./index.css";
// import { Navbar } from "./components/Navbar";
// import { Loader } from "./components/Loader";
// import { Footer } from "./components/Footer";
// import { ErrorBoundary } from "./components/ErrorBoundary";

// // Lazy loading the components
// const Home = lazy(() => import("./components/pages/Home"));
// const CarbonNeutrality = lazy(() => import("./components/pages/CarbonNeutrality"));
// const CarbonNeutralitySimulator = lazy(() => import("./components/pages/CarbonNeutralitySimulator"));
// const Estimation = lazy(() => import("./components/pages/Estimation"));
// const CarbonCredits = lazy(() => import("./components/pages/CarbonCredits"));



// function App() {
//   return (
//     <div className="App bg-gradient-to-br from-blue-100 to-green-100">
//       <Navbar />
//       <ErrorBoundary>
//         <Suspense fallback={<Loader />}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/carbonNeutrality" element={<CarbonNeutrality />} />
//             <Route
//               path="/carbonNeutralitySimulator"
//               element={<CarbonNeutralitySimulator />}
//             />
//             <Route path="/estimation" element={<Estimation />} />
//             <Route path="/carbonCredits" element={<CarbonCredits />} />
//           </Routes>
//         </Suspense>
//       </ErrorBoundary>
//       <Footer />
//     </div>
//   );
// }

// export default App;
