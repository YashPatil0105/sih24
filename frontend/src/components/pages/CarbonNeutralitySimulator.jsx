
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { TreeDeciduous, Zap, Truck } from 'lucide-react';

export const CarbonNeutralitySimulator = () => {
  const [cleanTech, setCleanTech] = useState(0);
  const [afforestation, setAfforestation] = useState(0);
  const [renewable, setRenewable] = useState(0);
  const [emissions, setEmissions] = useState(100);

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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Carbon Neutrality Pathways Simulator</h1>
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
    </div>
  );
};

