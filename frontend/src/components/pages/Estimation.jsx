import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

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
    // Here you would typically send the data to a server or process it further
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Emission Estimation Module</h1>
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
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
        </Tab.List>
        <Tab.Panels className="mt-4">
          {tabs.map((tab) => (
            <Tab.Panel key={tab.id} className="space-y-4">
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
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
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
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <Button onClick={handleSubmit}>Calculate Emissions</Button>
    </div>
  );
};
