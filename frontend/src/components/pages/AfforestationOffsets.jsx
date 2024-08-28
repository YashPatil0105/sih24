// import React from "react";
import React, { useState } from "react";

// export const Home = () => {
//   return <h1>Home</h1>;
// };


// import "tailwindcss/tailwind.css";

export const AfforestationOffsets = () => {
  const [emissions, setEmissions] = useState("");
  const [treeType, setTreeType] = useState("Pine");
  const [results, setResults] = useState(null);

  const calculateLandArea = () => {
    // Example calculation logic
    const absorptionRate = treeType === "Pine" ? 2.5 : 2.0; // arbitrary values (tons CO2/acre/year)
    const requiredLandArea = emissions / absorptionRate;
    setResults(requiredLandArea);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Afforestation Offsets</h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <EmissionInputForm
          emissions={emissions}
          setEmissions={setEmissions}
          treeType={treeType}
          setTreeType={setTreeType}
        />
        <CalculationControls calculateLandArea={calculateLandArea} />
        {results !== null && <ResultsDisplay results={results} />}
      </div>
    </div>
  );
};

const EmissionInputForm = ({ emissions, setEmissions, treeType, setTreeType }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Remaining Emissions (in tons/year)</label>
      <input
        type="number"
        value={emissions}
        onChange={(e) => setEmissions(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Tree Type</label>
      <select
        value={treeType}
        onChange={(e) => setTreeType(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
      >
        <option value="Pine">Pine</option>
        <option value="Oak">Oak</option>
      </select>
    </div>
  </div>
);

const CalculationControls = ({ calculateLandArea }) => (
  <div className="mt-6">
    <button
      onClick={calculateLandArea}
      className="w-full p-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
    >
      Calculate Required Land Area
    </button>
  </div>
);

const ResultsDisplay = ({ results }) => (
  <div className="mt-6 p-4 bg-green-100 rounded-md">
    <h2 className="text-lg font-semibold text-green-700">Results:</h2>
    <p className="text-green-700">Required Land Area: {results.toFixed(2)} acres</p>
  </div>
);

// export default AfforestationOffsets;
