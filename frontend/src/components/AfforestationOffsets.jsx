import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const AfforestationOffsets = () => {
  const [landArea, setLandArea] = useState("");
  const [treeType, setTreeType] = useState("Pine");
  const [state, setState] = useState("Select State");
  const [results, setResults] = useState(null);

  const calculateOffset = () => {
    // Example calculation logic
    const absorptionRate = treeType === "Pine" ? 1.2 : 1.0; // arbitrary values
    const totalAbsorption = landArea * absorptionRate;
    setResults(totalAbsorption);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Afforestation Offsets</h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <InputForm
          landArea={landArea}
          setLandArea={setLandArea}
          treeType={treeType}
          setTreeType={setTreeType}
          state={state}
          setState={setState}
        />
        <SimulationControls calculateOffset={calculateOffset} />
        {results !== null && <ResultsDisplay results={results} />}
      </div>
    </div>
  );
};

const InputForm = ({ landArea, setLandArea, treeType, setTreeType, state, setState }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Land Area (in acres)</label>
      <input
        type="number"
        value={landArea}
        onChange={(e) => setLandArea(e.target.value)}
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
    <div>
      <label className="block text-sm font-medium text-gray-700">State</label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
      >
        <option value="Select State">Select State</option>
        <option value="State1">State1</option>
        <option value="State2">State2</option>
      </select>
    </div>
  </div>
);

const SimulationControls = ({ calculateOffset }) => (
  <div className="mt-6">
    <button
      onClick={calculateOffset}
      className="w-full p-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
    >
      Calculate Offset
    </button>
  </div>
);

const ResultsDisplay = ({ results }) => (
  <div className="mt-6 p-4 bg-green-100 rounded-md">
    <h2 className="text-lg font-semibold text-green-700">Results:</h2>
    <p className="text-green-700">Total CO₂ Absorption Potential: {results} tons/year</p>
  </div>
);

export default AfforestationOffsets;
