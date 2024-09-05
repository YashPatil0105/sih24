import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TreeDeciduous, Zap, Truck } from 'lucide-react';

export const CarbonNeutralitySimulator = () => {
  const [methane_part, setmethane_part] = useState(0);
  const [afforestation_part, setafforestation_part] = useState(0);
  const [renewable_part, setrenewable_part] = useState(0);
  const [emissions, setEmissions] = useState(100);

  const [location, setlocation] = useState('');
  const [emission, setemission] = useState('');
  const [mine_type, setmine_type] = useState('');
  const [mine_size, setmine_size] = useState('');

  const [calculationResult, setCalculationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const newEmissions = Math.max(0, 100 - (methane_part + afforestation_part + renewable_part));
    setEmissions(newEmissions);
  }, [methane_part, afforestation_part, renewable_part]);

  const data = [
    { name: 'Remaining Emissions', value: emissions, color: '#EF4444' },
    { name: 'Clean Tech', value: methane_part, color: '#3B82F6' },
    { name: 'afforestation_part', value: afforestation_part, color: '#10B981' },
    { name: 'renewable_part Energy', value: renewable_part, color: '#F59E0B' },
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
      const response = await fetch('http://127.0.0.1:5100/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mine_type,
          location,
          emission,
          afforestation_part,
          methane_part,
          renewable_part,
          mine_size,
        }),
      });

      console.log(location, emission, mine_type, mine_size, methane_part, afforestation_part, renewable_part);


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
  const stringToNumberMapping = {
    "Low": 1,
    "Medium": 2,
    "High": 3,
    "N/A": 0 // Default value for "Not Available"
  };
  useEffect(() => {
    if (calculationResult) {
      // Extract and parse the afforestation cost and impact
      const afforestationCost = parseFloat(calculationResult.afforestation.total_cost.replace('Rs ', '').replace(',', ''));
      const afforestationImpact = calculationResult.afforestation.impact;
  
      // Sum up costs and impacts for methane_capture strategies
      const methaneCaptureData = calculationResult.methane_capture;
      const methaneCaptureCost = methaneCaptureData.reduce((acc, item) => acc + parseFloat(item.total_cost.replace('Rs ', '').replace(',', '')), 0);
      const methaneCaptureImpact = methaneCaptureData.reduce((acc, item) => acc + item.impact, 0);
  
      // Sum up costs and impacts for renewable_energy strategies
      const renewableEnergyData = calculationResult.renewable_energy;
      const renewableEnergyCost = renewableEnergyData.reduce((acc, item) => acc + parseFloat(item.total_cost.replace('Rs ', '').replace(',', '')), 0);
      const renewableEnergyImpact = renewableEnergyData.reduce((acc, item) => acc + item.impact, 0);
  
      // Prepare the data for the bar chart
      const newBarChartData = [
        {
          name: 'Afforestation',
          cost: afforestationCost,
          impact: afforestationImpact
        },
        {
          name: 'Methane Capture',
          cost: methaneCaptureCost,
          impact: methaneCaptureImpact
        },
        {
          name: 'Renewable Energy',
          cost: renewableEnergyCost,
          impact: renewableEnergyImpact
        }
      ];
      setBarChartData(newBarChartData);
    }
  }, [calculationResult]);
  

  const formatResult = (result) => {
    return (
      <div className="space-y-4">
        <div className="bg-blue-100 p-4 rounded-md">
          <h5 className="font-semibold text-blue-800">Afforestation Strategy</h5>
          <p>Tree Type: {result.afforestation.type_of_tree}</p>
          <p>Area Required: {result.afforestation.area_to_grow_trees_ha}</p>
          <p>Impact: {result.afforestation.impact}</p>
          <p>Cost: {result.afforestation.total_cost}</p>
        </div>
        
        <div className="bg-green-100 p-4 rounded-md">
          <h5 className="font-semibold text-green-800">Methane Capture Systems</h5>
          {result.methane_capture.map((item, index) => (
            <div key={index} className="mb-2">
              <p>Technology: {item.technology_to_use}</p>
              <p>Devices: {item.devices}</p>
              <p>Impact: {item.impact}</p>
              <p>Cost: {item.total_cost}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-yellow-100 p-4 rounded-md">
          <h5 className="font-semibold text-yellow-800">Renewable Energy</h5>
          {result.renewable_energy.map((item, index) => (
            <div key={index} className="mb-2">
              <p>Strategy: {item.renewable_strategy}</p>
              <p>Devices: {item.devices}</p>
              <p>Impact: {item.impact}</p>
              <p>Cost: {item.total_cost}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-100 to-green-100 p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Carbon Neutrality Pathways Simulator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setlocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
          />
          <label
            htmlFor="mine_size"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mine Size
          </label>
          <select
            id="mine_size"
            value={mine_size}
            onChange={(e) => setmine_size(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
          >
            <option value="">Select mine size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="emission"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Emission (tons CO2e)
          </label>
          <input
            id="emission"
            type="number"
            value={emission}
            onChange={(e) => setemission(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
          />
          <label
            htmlFor="mine_type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mine Type
          </label>
          <select
            id="mine_type"
            value={mine_type}
            onChange={(e) => setmine_type(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"
          >
            <option value="">Select mine type</option>
            <option value="Open-Pit">Opencast</option>
            <option value="Underground">Underground</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <StrategyCard
            title="Clean Technologies"
            icon={Truck}
            value={methane_part}
            setValue={setmethane_part}
            color="#3B82F6"
          />
          <StrategyCard
            title="afforestation_part Offsets"
            icon={TreeDeciduous}
            value={afforestation_part}
            setValue={setafforestation_part}
            color="#10B981"
          />
          <StrategyCard
            title="renewable_part Energy"
            icon={Zap}
            value={renewable_part}
            setValue={setrenewable_part}
            color="#F59E0B"
          />
          <button
            onClick={handleCalculate}
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "Calculating..." : "Calculate"}
          </button>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-md h-full flex flex-col justify-center p-4">
            <h3 className="text-xl font-semibold text-center mb-4">
              Emissions Breakdown
            </h3>
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
                    Remaining Emissions:{" "}
                    <span className="text-red-500">{emissions}%</span>
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Adjust the sliders to see how different strategies impact
                emissions.
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
        <div className="mt-8">
          <h4 className="font-semibold mb-4">Strategy Comparison:</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="cost"
                fill="#8884d8"
                name="Cost (₹)"
              />
              <Bar
                yAxisId="right"
                dataKey="impact"
                fill="#82ca9d"
                name="Impact (CO2e reduction)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {calculationResult && (
        <div className="mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
          <h4 className="font-semibold mb-4 text-xl">Calculation Result:</h4>
          {formatResult(calculationResult)}
        </div>
      )}
    </div>
  );
};




