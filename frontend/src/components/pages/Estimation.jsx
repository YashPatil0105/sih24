import React, { useState } from 'react';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react';
import { Info } from 'lucide-react';

const InputWithUnit = ({ type, value, onChange, placeholder, unit }) => (
  <div className="flex items-center">
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
    <span className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
      {unit}
    </span>
  </div>
);

const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
  >
    {children}
  </button>
);

const InfoTooltip = ({ text }) => (
  <div className="group relative inline-block ml-2">
    <Info size={16} className="text-gray-400" />
    <span className="absolute hidden group-hover:inline-block bg-gray-800 text-white text-xs rounded p-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48">
      {text}
    </span>
  </div>
);

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const Alert = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`mt-6 bg-green-100 border-l-4 border-green-400 text-green-700 px-4 py-3 rounded relative ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
};
const AlertDescription = ({ children }) => {
  return <span className="block sm:inline">{children}</span>;
};
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
    },
    wasteManagement: {
      wasteType: '',
      amountGenerated: '',
      disposalMethod: ''
    }
  });

  const [calculatedEmissions, setCalculatedEmissions] = useState(null);

  const options = {
    excavation: {
      equipmentType: ['Bulldozers', 'Excavators', 'Draglines', 'Wheel Loaders', 'Hydraulic Shovels'],
      fuelType: ['Diesel', 'Biodiesel', 'Electricity', 'Natural Gas', 'Hydrogen Fuel Cell']
    },
    transportation: {
      vehicleType: ['Haul Trucks', 'Conveyor Belts', 'Rail Transport', 'Underground Shuttle Cars', 'Skid-Steer Loaders']
    },
    equipmentUsage: {
      equipmentType: ['Generators', 'Crushers', 'Screening Machines', 'Drills', 'Ventilation Systems', 'Pumps'],
      energySource: ['Diesel', 'Electricity', 'Natural Gas', 'Solar', 'Wind']
    },
    blastingOperations: {
      explosiveType: ['ANFO', 'Emulsion Explosives', 'Water Gel Explosives', 'Slurry Explosives', 'Electronic Detonators']
    },
    powerConsumption: {
      powerSource: ['Grid Electricity', 'On-site Solar', 'On-site Wind', 'Diesel Generators', 'Natural Gas Generators', 'Hydroelectric']
    },
    waterPumping: {
      pumpType: ['Electric Submersible Pumps', 'Diesel Pumps', 'Centrifugal Pumps', 'Positive Displacement Pumps', 'Airlift Pumps']
    },
    employeeTransportation: {
      transportMode: ['Company Buses', 'Personal Vehicles', 'Carpooling', 'Electric Shuttles', 'Bicycles'],
      fuelType: ['Diesel', 'Petrol', 'Electricity', 'Hybrid', 'Compressed Natural Gas (CNG)']
    },
    wasteManagement: {
      wasteType: ['Overburden', 'Tailings', 'Waste Rock', 'Used Oil', 'Scrap Metal'],
      disposalMethod: ['Backfilling', 'Surface Impoundment', 'Recycling', 'Incineration', 'Landfill']
    }
  };

  const units = {
    operatingHours: 'hours/day',
    fuelConsumptionRate: 'L/hour',
    distanceCovered: 'km/day',
    loadCapacity: 'tonnes',
    numberOfTrips: 'trips/day',
    energyConsumptionRate: 'kWh/hour',
    amountUsed: 'kg/blast',
    blastingFrequency: 'blasts/week',
    dailyConsumption: 'kWh/day',
    gridEmissionFactor: 'kg CO2e/kWh',
    amountPumped: 'm³/day',
    distanceTraveled: 'km/day',
    numberOfEmployees: 'employees',
    amountGenerated: 'tonnes/day'
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
    // Simulated calculation (replace with actual calculation logic)
    const totalEmissions = Object.values(formData).reduce((sum, category) => {
      return sum + Object.values(category).reduce((catSum, value) => {
        const numValue = parseFloat(value);
        return catSum + (isNaN(numValue) ? 0 : numValue);
      }, 0);
    }, 0);

    setCalculatedEmissions(totalEmissions.toFixed(2));
  };
 
  const tabs = [
    { name: 'Excavation', id: 'excavation' },
    { name: 'Transportation', id: 'transportation' },
    { name: 'Equipment Usage', id: 'equipmentUsage' },
    { name: 'Blasting Operations', id: 'blastingOperations' },
    { name: 'Power Consumption', id: 'powerConsumption' },
    { name: 'Water Pumping', id: 'waterPumping' },
    { name: 'Employee Transportation', id: 'employeeTransportation' },
    { name: 'Waste Management', id: 'wasteManagement' }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-100 to-green-100 flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="container max-w-5xl w-full bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Carbon Emission Estimation for Mines
        </h1>
        <TabGroup>
          <TabList className="font-accent  flex p-1 space-x-1 bg-blue-900/20 rounded-xl overflow-x-auto">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                className={({ selected }) =>
                  classNames(
                    "py-2.5 px-3 text-sm leading-5 font-medium text-blue-700 rounded-lg whitespace-nowrap",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-6">
            {tabs.map((tab) => (
              <TabPanel
                key={tab.id}
                className="bg-white p-6 rounded-xl shadow-md space-y-4"
              >
                <h2 className="text-xl font-semibold mb-4 text-blue-700">
                  {tab.name} Data
                </h2>
                {Object.entries(formData[tab.id]).map(([field, value]) => (
                  <div key={field} className="space-y-2">
                    <label
                      htmlFor={`${tab.id}-${field}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.replace(/([A-Z])/g, " $1").trim()}
                      <InfoTooltip
                        text={`Enter the ${field.toLowerCase()} for ${tab.name.toLowerCase()}`}
                      />
                    </label>
                    {options[tab.id] && options[tab.id][field] ? (
                      <select
                        id={`${tab.id}-${field}`}
                        value={value}
                        onChange={(e) =>
                          handleInputChange(tab.id, field, e.target.value)
                        }
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Select...</option>
                        {options[tab.id][field].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : units[field] ? (
                      <InputWithUnit
                        type="number"
                        value={value}
                        onChange={(e) =>
                          handleInputChange(tab.id, field, e.target.value)
                        }
                        placeholder={`Enter ${field
                          .replace(/([A-Z])/g, " $1")
                          .trim()
                          .toLowerCase()}...`}
                        unit={units[field]}
                      />
                    ) : (
                      <input
                        type="text"
                        id={`${tab.id}-${field}`}
                        value={value}
                        onChange={(e) =>
                          handleInputChange(tab.id, field, e.target.value)
                        }
                        placeholder={`Enter ${field
                          .replace(/([A-Z])/g, " $1")
                          .trim()
                          .toLowerCase()}...`}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    )}
                  </div>
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
        <div className="mt-8 flex justify-center">
          <Button onClick={handleSubmit}>Calculate Emissions</Button>
        </div>
        {calculatedEmissions && (
          <Alert
            className="mt-6 bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <AlertDescription>
              Estimated total emissions: {calculatedEmissions} tons CO2
              equivalent
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};