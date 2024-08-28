import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const CarbonCredits = () => {
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [carbonPrice, setCarbonPrice] = useState(134);
  const [projectType, setProjectType] = useState('');
  const [additionalityScore, setAdditionalityScore] = useState(0);
  const [permanenceScore, setPermanenceScore] = useState(0);
  const [measurabilityScore, setMeasurabilityScore] = useState(0);
  const [showGuidance, setShowGuidance] = useState(false);

  const calculateCredits = () => {
    const creditsCost = totalEmissions * carbonPrice;
    const qualityScore = (additionalityScore + permanenceScore + measurabilityScore) / 3;
    return { creditsCost, qualityScore };
  };

  const { creditsCost, qualityScore } = calculateCredits();

  const qualityData = [
    { name: 'Additionality', score: additionalityScore },
    { name: 'Permanence', score: permanenceScore },
    { name: 'Measurability', score: measurabilityScore },
  ];
  const ScoringGuidance = () => (
    <div className="mt-4 p-4 bg-gray-100 rounded">
      <h3 className="font-bold mb-2">Scoring Guide (0-10 scale)</h3>
      <h4 className="font-semibold">Additionality</h4>
      <ul className="list-disc list-inside mb-2">
        <li>0-2: Project would have happened anyway</li>
        <li>3-5: Project more likely with credits</li>
        <li>6-8: Project unlikely without credits</li>
        <li>9-10: Project definitely wouldn't occur without credits</li>
      </ul>
      <h4 className="font-semibold">Permanence</h4>
      <ul className="list-disc list-inside mb-2">
        <li>0-2: Less than 5 years</li>
        <li>3-5: 5-20 years</li>
        <li>6-8: 20-100 years</li>
        <li>9-10: Over 100 years (permanent)</li>
      </ul>
      <h4 className="font-semibold">Measurability</h4>
      <ul className="list-disc list-inside">
        <li>0-2: No data or unverified claims</li>
        <li>3-5: Some unverified data</li>
        <li>6-8: Comprehensive, third-party verified data</li>
        <li>9-10: Extensive, multiple-party verified data</li>
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carbon Credit Calculator for Coal Mines</h1>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-2">Total CO2 Emissions</h2>
        <input 
          type="number" 
          placeholder="Total CO2 emissions in tonnes"
          className="border rounded px-2 py-1 w-full mb-2"
          value={totalEmissions}
          onChange={(e) => setTotalEmissions(Number(e.target.value))}
        />
        
        <h2 className="text-xl font-semibold mb-2">Carbon Price ($/tonne)</h2>
        <input 
          type="number" 
          className="border rounded px-2 py-1 w-full mb-2"
          value={carbonPrice}
          onChange={(e) => setCarbonPrice(Number(e.target.value))}
        />

        <h2 className="text-xl font-semibold mb-2">Project Type</h2>
        <select 
          className="border rounded px-2 py-1 w-full mb-2"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
        >
          <option value="">Select project type</option>
          <option value="wind">Wind</option>
          <option value="solar">Solar</option>
          <option value="forestry">Forestry</option>
          <option value="methane">Methane Capture</option>
        </select>

        <h2 className="text-xl font-semibold mb-2">Quality Scores (0-10)</h2>
        <button 
          className="text-blue-500 underline mb-2"
          onClick={() => setShowGuidance(!showGuidance)}
        >
          {showGuidance ? 'Hide' : 'Show'} Scoring Guidance
        </button>
        {showGuidance && <ScoringGuidance />}
        <div className="flex gap-2 mb-2">
          <input 
            type="number" 
            placeholder="Additionality"
            className="border rounded px-2 py-1 flex-1"
            min="0"
            max="10"
            value={additionalityScore}
            onChange={(e) => setAdditionalityScore(Number(e.target.value))}
          />
          <input 
            type="number" 
            placeholder="Permanence"
            className="border rounded px-2 py-1 flex-1"
            min="0"
            max="10"
            value={permanenceScore}
            onChange={(e) => setPermanenceScore(Number(e.target.value))}
          />
          <input 
            type="number" 
            placeholder="Measurability"
            className="border rounded px-2 py-1 flex-1"
            min="0"
            max="10"
            value={measurabilityScore}
            onChange={(e) => setMeasurabilityScore(Number(e.target.value))}
          />
        </div>
      </div>


      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4">
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        <p>Total Emissions: {totalEmissions} tonnes CO2e</p>
        <p>Carbon Credits Cost: ${creditsCost.toFixed(2)}</p>
        <p>Overall Quality Score: {qualityScore.toFixed(2)} / 10</p>
        
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={qualityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// export default CarbonCreditCalculator;