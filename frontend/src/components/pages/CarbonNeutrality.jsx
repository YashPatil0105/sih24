import React, { useState, useEffect, useRef } from 'react';
import { Tab } from '@headlessui/react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);
import { AfforestationOffsets } from './AfforestationOffsets';

const pathwaysData = {
  cleanTechnologies: {
    description: 'Adopt technologies like electric vehicles, methane capture systems, and renewable energy sources.',
    impact: [10, 20, 30, 40, 50]
  },
  afforestationOffsets: {
    description: 'Calculate land area required for tree plantations based on state-specific afforestation plans.',
    impact: [15, 25, 35, 45, 55]
  },
  renewableEnergy: {
    description: 'Explore potential of using renewable energy sources to reduce reliance on fossil fuels.',
    impact: [20, 30, 40, 50, 60]
  }
};

const paths = [
  { name: 'Clean Technologies', id: 'cleanTechnologies' },
  { name: 'Afforestation Offsets', id: 'afforestationOffsets' },
  { name: 'Renewable Energy', id: 'renewableEnergy' }
];

const getChartData = (data) => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Impact Over Time',
      data: data,
      borderColor: '#1d4ed8',
      backgroundColor: 'rgba(29, 78, 216, 0.2)',
      borderWidth: 2
    }
  ]
});

export const CarbonNeutrality = () => {
  const [selectedPathway, setSelectedPathway] = useState(paths[0].id);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, [selectedPathway]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-green-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
        Carbon Neutrality Pathways
      </h1>
      <Tab.Group>
        <Tab.List className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 bg-blue-200 p-2 rounded-lg mb-6">
          {paths.map((path) => (
            <Tab
              key={path.id}
              onClick={() => setSelectedPathway(path.id)}
              className={({ selected }) =>
                selected
                  ? "bg-white text-blue-700 border border-blue-300 rounded-lg py-2 px-4 sm:px-5 lg:px-6 transition-colors duration-300"
                  : "text-blue-500 py-2 px-4 sm:px-5 lg:px-6 hover:bg-blue-100 rounded-lg transition-colors duration-300"
              }
            >
              {path.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
          {paths.map((path) => (
            <Tab.Panel key={path.id}>
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                  {path.name}
                </h2>
                <p className="text-gray-700 text-sm sm:text-lg lg:text-xl">
                  {pathwaysData[path.id].description}
                </p>
                <div className="mt-4">
                  <div className="relative h-64 sm:h-72 lg:h-96">
                    <Line
                      data={getChartData(pathwaysData[path.id].impact)}
                      ref={chartRef}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <AfforestationOffsets />
    </div>
  );
};
