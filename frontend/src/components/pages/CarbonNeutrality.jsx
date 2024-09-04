import React, { useState, useEffect, useRef } from 'react';
import { Tab } from '@headlessui/react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);
import { AfforestationOffsets } from './AfforestationOffsets';

const pathwaysData = {
  cleanTechnologies: {
    description: 'Adopt technologies like electric vehicles, methane capture systems, and renewable energy sources.',
    impact: [1.8, 1.76, 1.72, 1.68, 1.65, 1.62],
    additionalData: [
      [1.8, 1.76, 1.72, 1.68, 1.65, 1.62],
      [5.0, 4.9, 4.8, 4.7, 4.6, 4.5],
      [0.2, 0.195, 0.19, 0.185, 0.18, 0.175],
      [0.16, 0.155, 0.15, 0.145, 0.14, 0.135],
      [1.96, 1.92, 1.88, 1.84, 1.8, 1.76],
      [9.0, 8.9, 8.8, 8.7, 8.6, 8.5],
      [1.8, 1.76, 1.72, 1.68, 1.65, 1.62]
    ],
    methodNames: [
      "Methane Drainage Systems",
      "Methane Recovery Systems",
      "Gas-to-Energy Systems",
      "Methane-Fueled Engines",
      "Methane Fuel Cells",
      "Flare Systems",
      "Methane Scrubbers",
      "Biofilters"
    ]
  },
  afforestationOffsets: {
    description: 'Calculate land area required for tree plantations based on state-specific afforestation plans.',
    impact: [375, 2100, 6000, 6000, 12000, 12000]
  },
  renewableEnergy: {
    description: 'Explore potential of using renewable energy sources to reduce reliance on fossil fuels.',
    impact: [2.4,	2.9,	3.5,	4	,4.7	,5.4],
    additionalData: [[1.9	,2.4	,2.8	,3.4	,3.9	,4.3], [2	,2.6	,3.3	,4.1	,4.9	,5.8],  [0.5, 0.7, 0.9, 1.1, 1.1, 1.3],
    [0.9, 1.1, 1.3, 1.4, 1.7, 1.5],
    [0.1, 0.2, 0.3, 0.3, 0.4, 0.5]],
    methodNames: [
      "Solar Energy",
      "Wind Energy",
      "Hydroelectric Power",
      "Geothermal Energy",
      "Biomass Energy",
      "Tidal Energy"
    ]
  }
};

const paths = [
  { name: 'Clean Technologies', id: 'cleanTechnologies' },
  { name: 'Afforestation Offsets', id: 'afforestationOffsets' },
  { name: 'Renewable Energy', id: 'renewableEnergy' }
];

const getChartData = (data, methodNames) => ({
  labels: ['5', '10', '15', '20', '25', '30'],
  datasets: data.map((dataset, index) => ({
    label: methodNames ? methodNames[index] : `Method ${index + 1}`,
    data: dataset,
    borderColor: `hsl(${index * 30}, 70%, 50%)`,
    backgroundColor: `hsla(${index * 30}, 70%, 50%, 0.2)`,
    borderWidth: 2
  }))
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
                      data={getChartData(
                        path.id === 'renewableEnergy' || path.id === 'cleanTechnologies'
                          ? [
                              pathwaysData[path.id].impact,
                              ...pathwaysData[path.id].additionalData
                            ]
                          : [pathwaysData[path.id].impact],
                        pathwaysData[path.id].methodNames
                      )}
                      ref={chartRef}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          title: {
                            display: true,
                            text: 'Impact Over Time'
                          },
                          legend: {
                            display: true,
                            position: 'bottom'
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Impact (units)'
                            }
                          },
                          x: {
                            title: {
                              display: true,
                              text: 'Years'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

    </div>
  );
};
