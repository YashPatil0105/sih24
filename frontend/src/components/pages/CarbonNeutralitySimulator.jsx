import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { TreeDeciduous, Zap, Truck } from 'lucide-react';

export const CarbonNeutralitySimulator = () => {
  const [cleanTech, setCleanTech] = useState(0);
  const [afforestation, setAfforestation] = useState(0);
  const [renewable, setRenewable] = useState(0);
  const [emissions, setEmissions] = useState(100);
  
  const [mineName, setMineName] = useState('');
  const [mineState, setMineState] = useState('');
  const [mineEmission, setMineEmission] = useState('');
  const [mineType, setMineType] = useState('');
  const [mineSize, setMineSize] = useState('');
  
  const [calculationResult, setCalculationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const newEmissions = Math.max(0, 100 - (cleanTech + afforestation + renewable));
    setEmissions(newEmissions);
  }, [cleanTech, afforestation, renewable]);

  const data = [
    { name: 'Remaining Emissions', value: emissions, color: '#EF4444' },
    { name: 'Clean Tech', value: cleanTech, color: '#3B82F6' },
    { name: 'Afforestation', value: afforestation, color: '#10B981' },
    { name: 'Renewable Energy', value: renewable, color: '#F59E0B' },
  ];

  const StrategyCard = ({ title, icon: Icon, value, setValue, color }) => (
    <div className="bg-white rounded-lg shadow-md mb-4 p-4">
      <div className="flex items-center mb-2">
        <Icon className="mr-2" size={24} color={color} />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <p className="mt-2 text-right font-medium">{value}%</p>
    </div>
  );

  const handleCalculate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mineState,
          mineEmission: parseFloat(mineEmission),
          mineType,
          mineSize,
          cleanTech,
          afforestation,
          renewable,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to calculate');
      }
      
      const result = await response.json();
      setCalculationResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-center">Carbon Neutrality Pathways Simulator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>

          <label htmlFor="mineState" className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input
            id="mineState"
            type="text"
            value={mineState}
            onChange={(e) => setMineState(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
          />
          <label htmlFor="mineSize" className="block text-sm font-medium text-gray-700 mb-1">Mine Size</label>
          <select
            id="mineSize"
            value={mineSize}
            onChange={(e) => setMineSize(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
          >
            <option value="">Select mine size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div>
          <label htmlFor="mineEmission" className="block text-sm font-medium text-gray-700 mb-1">Emission (tons CO2e)</label>
          <input
            id="mineEmission"
            type="number"
            value={mineEmission}
            onChange={(e) => setMineEmission(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
          />
          <label htmlFor="mineType" className="block text-sm font-medium text-gray-700 mb-1">Mine Type</label>
          <select
            id="mineType"
            value={mineType}
            onChange={(e) => setMineType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
          >
            <option value="">Select mine type</option>
            <option value="opencast">Opencast</option>
            <option value="underground">Underground</option>
            <option value="quarry">Quarry</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <StrategyCard
            title="Clean Technologies"
            icon={Truck}
            value={cleanTech}
            setValue={setCleanTech}
            color="#3B82F6"
          />
          <StrategyCard
            title="Afforestation Offsets"
            icon={TreeDeciduous}
            value={afforestation}
            setValue={setAfforestation}
            color="#10B981"
          />
          <StrategyCard
            title="Renewable Energy"
            icon={Zap}
            value={renewable}
            setValue={setRenewable}
            color="#F59E0B"
          />
          <button
            onClick={handleCalculate}
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Calculating...' : 'Calculate'}
          </button>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-md h-full flex flex-col justify-center p-4">
            <h3 className="text-xl font-semibold text-center mb-4">Emissions Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold">
                {emissions === 0 ? (
                  <span className="text-green-500">Carbon Neutral!</span>
                ) : (
                  <span>
                    Remaining Emissions: <span className="text-red-500">{emissions}%</span>
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Adjust the sliders to see how different strategies impact emissions.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {calculationResult && (
        <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h4 className="font-semibold mb-2">Calculation Result:</h4>
          <pre className="whitespace-pre-wrap">{JSON.stringify(calculationResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};