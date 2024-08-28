import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

export const CarbonCredits = () => {
  const [activities, setActivities] = useState([{ type: '', quantity: 0, unit: '' }]);
  const [carbonPrice, setCarbonPrice] = useState(0);
  const [results, setResults] = useState(null);

  const handleActivityChange = (index, field, value) => {
    const newActivities = [...activities];
    newActivities[index][field] = value;
    setActivities(newActivities);
  };

  const addActivity = () => {
    setActivities([...activities, { type: '', quantity: 0, unit: '' }]);
  };

  const calculateEmissions = () => {
    // This is a placeholder calculation. In a real application, you'd use proper emission factors and calculations.
    const totalEmissions = activities.reduce((sum, activity) => sum + activity.quantity * 0.5, 0);
    const creditsCost = totalEmissions * carbonPrice;
    setResults({ totalEmissions, creditsCost });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carbon Credit Calculator for Coal Mines</h1>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-2">Activity Data Input</h2>
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select 
              className="border rounded px-2 py-1"
              onChange={(e) => handleActivityChange(index, 'type', e.target.value)}
            >
              <option value="">Select activity type</option>
              <option value="electricity">Electricity Use</option>
              <option value="fuel">Fuel Consumption</option>
              <option value="waste">Waste Disposal</option>
            </select>
            <input 
              type="number" 
              placeholder="Quantity"
              className="border rounded px-2 py-1"
              onChange={(e) => handleActivityChange(index, 'quantity', e.target.value)}
            />
            <input 
              placeholder="Unit"
              className="border rounded px-2 py-1"
              onChange={(e) => handleActivityChange(index, 'unit', e.target.value)}
            />
          </div>
        ))}
        <button 
          onClick={addActivity}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Activity
        </button>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-2">Carbon Price</h2>
        <input 
          type="number" 
          placeholder="Carbon price per tonne CO2e"
          className="border rounded px-2 py-1"
          onChange={(e) => setCarbonPrice(e.target.value)}
        />
      </div>

      <button 
        onClick={calculateEmissions}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Calculate
      </button>

      {results && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4">
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <p>Total Emissions: {results.totalEmissions} tonnes CO2e</p>
          <p>Carbon Credits Cost: ${results.creditsCost}</p>
          
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie dataKey="value" data={activities.map(a => ({ name: a.type, value: a.quantity * 0.5 }))} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

// export default CarbonCredits;