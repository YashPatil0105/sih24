
import React, { useState } from 'react';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';

const Input = ({ type, value, onChange, placeholder }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  />
);

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
  >
    {children}
  </button>
);

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Estimation = () => {
  const [formData, setFormData] = useState({
    excavation: {
      equipmentType: '',
      operatingHours: '',
      fuelType: '',
      fuelConsumptionRate: ''
    },
    transportation: {
      vehicleType: '',
      distanceCovered: '',
      fuelConsumptionRate: '',
      loadCapacity: '',
      numberOfTrips: ''
    },
    equipmentUsage: {
      equipmentType: '',
      operatingHours: '',
      energySource: '',
      energyConsumptionRate: ''
    },
    blastingOperations: {
      explosiveType: '',
      amountUsed: '',
      blastingFrequency: ''
    },
    powerConsumption: {
      dailyConsumption: '',
      powerSource: '',
      gridEmissionFactor: ''
    },
    waterPumping: {
      amountPumped: '',
      pumpType: '',
      energyConsumptionRate: ''
    },
    employeeTransportation: {
      transportMode: '',
      distanceTraveled: '',
      fuelType: '',
      numberOfEmployees: ''
    }
  });

  const options = {
    excavation: {
      equipmentType: ['Bulldozers', 'Excavators', 'Draglines'],
      fuelType: ['Diesel', 'Electricity', 'Other']
    },
    transportation: {
      vehicleType: ['Trucks', 'Conveyor Belts', 'Rail Transport']
    },
    equipmentUsage: {
      equipmentType: ['Generators', 'Crushers', 'Screening Machines'],
      energySource: ['Diesel', 'Electricity']
    },
    blastingOperations: {
      explosiveType: ['ANFO', 'Dynamite']
    },
    powerConsumption: {
      powerSource: ['Grid Electricity', 'Renewable Energy', 'On-site Generators']
    },
    waterPumping: {
      pumpType: ['Electric Pumps', 'Diesel Pumps']
    },
    employeeTransportation: {
      transportMode: ['Buses', 'Personal Vehicles', 'Carpooling'],
      fuelType: ['Diesel', 'Petrol', 'Electricity']
    }
  };

  const handleInputChange = (category, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  const tabs = [
    { name: 'Excavation', id: 'excavation' },
    { name: 'Transportation', id: 'transportation' },
    { name: 'Equipment Usage', id: 'equipmentUsage' },
    { name: 'Blasting Operations', id: 'blastingOperations' },
    { name: 'Power Consumption', id: 'powerConsumption' },
    { name: 'Water Pumping', id: 'waterPumping' },
    { name: 'Employee Transportation', id: 'employeeTransportation' }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="container max-w-5xl w-full bg-slate-100 rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-4">Emission Estimation Module</h1>
        <TabGroup>
          <TabList className="flex p-1 space-x-9 bg-blue-900/20 rounded-xl overflow-x-auto">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                className={({ selected }) =>
                  classNames(
                    'py-2.5 px-3 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-4">
            {tabs.map((tab) => (
              <TabPanel key={tab.id} className="space-y-4">
                {Object.entries(formData[tab.id]).map(([field, value]) => (
                  <div key={field} className="space-y-2">
                    <label htmlFor={`${tab.id}-${field}`} className="block text-sm font-medium text-gray-700">
                      {field.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {(field.includes('Type') || field.includes('Source') || field.includes('Mode')) ? (
                      <select
                        id={`${tab.id}-${field}`}
                        value={value}
                        onChange={(e) => handleInputChange(tab.id, field, e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Select...</option>
                        {options[tab.id][field].map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        id={`${tab.id}-${field}`}
                        value={value}
                        onChange={(e) => handleInputChange(tab.id, field, e.target.value)}
                        placeholder="Enter value..."
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    )}
                  </div>
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
        <Button onClick={handleSubmit}>Calculate Emissions</Button>
      </div>
    </div>
  );
};
