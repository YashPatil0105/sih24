// import React, { useState, useEffect } from 'react';
// import { LineChart, Line,BarChart,Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Bell, Settings, Search, Moon, Sun, Truck, Drill,  Trash } from 'lucide-react';

// export const Dashboard = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [emissions, setEmissions] = useState([]);
//   const [alerts, setAlerts] = useState([]);
//   const [excavationData, setExcavationData] = useState([]);
//   const [transportationData, setTransportationData] = useState([]);
//   const [blastingData, setBlastingData] = useState([]);
//   const [powerWaterData, setPowerWaterData] = useState([]);
//   const [wasteData, setWasteData] = useState([]);

//   useEffect(() => {
//     // Simulate fetching data
//     setEmissions([
//       { date: '2024-01', value: 1000 },
//       { date: '2024-02', value: 1200 },
//       { date: '2024-03', value: 900 },
//       { date: '2024-04', value: 1500 },
//     ]);
//     setAlerts([
//       { id: 1, title: 'High Emission Level', description: 'Excavation area exceeding threshold' },
//       { id: 2, title: 'Maintenance Due', description: 'Vehicle XYZ123 requires servicing' },
//     ]);
//     setExcavationData([
//       { equipment: 'Excavator X', status: 'Active', emissions: 500 },
//       { equipment: 'Excavator Y', status: 'Idle', emissions: 200 },
//       { equipment: 'Excavator Z', status: 'Maintenance', emissions: 0 },
//     ]);
//     setTransportationData([
//       { vehicle: 'Truck A', fuel: 100, emissions: 50 },
//       { vehicle: 'Truck B', fuel: 75, emissions: 40 },
//       { vehicle: 'Truck C', fuel: 120, emissions: 60 },
//     ]);
//     setBlastingData([
//       { date: '2024-03-15', explosive: 'Dynamite', emissions: 80 },
//       { date: '2024-04-01', explosive: 'ANFO', emissions: 60 },
//       { date: '2024-04-20', explosive: 'Emulsion', emissions: 70 },
//     ]);
//     setPowerWaterData([
//       { type: 'Electricity', usage: 5000, emissions: 3000 },
//       { type: 'Water', usage: 20000, emissions: 500 },
//     ]);
//     setWasteData([
//       { type: 'Metal', amount: 500, disposal: 'Recycling', emissions: 50 },
//       { type: 'Plastic', amount: 200, disposal: 'Landfill', emissions: 80 },
//       { type: 'Organic', amount: 800, disposal: 'Composting', emissions: 20 },
//     ]);
//   }, []);

//   return (
//     <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
//       {/* <nav className="bg-blue-600 p-4 text-white">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Mine Operator Dashboard</h1>
//           <div className="flex items-center space-x-4">
//             <Search className="w-5 h-5 cursor-pointer" />
//             <Bell className="w-5 h-5 cursor-pointer" />
//             <Settings className="w-5 h-5 cursor-pointer" />
//             <button onClick={() => setDarkMode(!darkMode)}>
//               {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>
//       </nav> */}

//       <main className="container mx-auto mt-8 p-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Emissions Summary */}
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Total Emissions Summary</h2>
//             <ResponsiveContainer width="100%" height={200}>
//               <LineChart data={emissions}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="value" stroke="#8884d8" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
//             <ul className="space-y-2">
//               <li>Updated emission factors for Excavator X</li>
//               <li>New waste disposal record added</li>
//               <li>Monthly report generated</li>
//             </ul>
//           </div>

//           {/* Alerts and Notifications */}
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Alerts and Notifications</h2>
//             {alerts.map((alert) => (
//               <div key={alert.id} className="border-l-4 border-red-500 bg-red-100 dark:bg-red-900 dark:text-white p-4 mb-2">
//                 <h3 className="text-lg font-semibold">{alert.title}</h3>
//                 <p>{alert.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Activity Management Panels */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">
//               <Truck className="w-5 h-5 mr-2" />
//               Transportation Management
//             </h2>
//             <div>
//               <ResponsiveContainer width="100%" height={200}>
//                 <LineChart data={transportationData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="vehicle" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="fuel" stroke="#8884d8" />
//                   <Line type="monotone" dataKey="emissions" stroke="#82ca9d" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Add other Activity Management Panels here */}

//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">
//               <Drill className="w-5 h-5 mr-2" />
//               Blasting Operations
//             </h2>
//             <ul className="space-y-2">
//               {blastingData.map((blast, index) => (
//                 <li key={index}>
//                   <div>Date: {blast.date}</div>
//                   <div>Explosive: {blast.explosive}</div>
//                   <div>Emissions: {blast.emissions}</div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">
//               {/* <Electricity className="w-5 h-5 mr-2" /> */}
//               Power and Water Management
//             </h2>
//             <ResponsiveContainer width="100%" height={200}>
//               <BarChart data={powerWaterData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="type" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="usage" fill="#8884d8" />
//                 <Bar dataKey="emissions" fill="#82ca9d" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">
//               <Drill className="w-5 h-5 mr-2" />
//               Excavation Management
//             </h2>
//             <ul className="space-y-2">
//               {excavationData.map((excavation, index) => (
//                 <li key={index}>
//                   <div>Equipment: {excavation.equipment}</div>
//                   <div>Status: {excavation.status}</div>
//                   <div>Emissions: {excavation.emissions}</div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Waste Management Panel */}
//         <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">
//             <Trash className="w-5 h-5 mr-2" />
//             Waste Management
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Waste Tracking</h3>
//               <ul className="space-y-2">
//                 {wasteData.map((waste, index) => (
//                   <li key={index}>
//                     <div>Type: {waste.type}</div>
//                     <div>Amount: {waste.amount}</div>
//                     <div>Disposal: {waste.disposal}</div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Emissions from Waste</h3>
//               <ResponsiveContainer width="100%" height={200}>
//                 <BarChart data={wasteData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="type" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="emissions" fill="#82ca9d" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Reporting and Analytics */}
//         <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Reporting and Analytics</h2>
//           {/* Add components for emission reports and graphs/charts */}
//         </div>

//         {/* User Management */}
//         <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">User Management</h2>
//           {/* Add components for RBAC and activity log */}
//         </div>

//         {/* Settings */}
//         <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Settings</h2>
//           {/* Add components for emission factors and system configurations */}
//         </div>
//       </main>
//     </div>
//   );
// };

// // export default Dashboard;
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Bell, Settings, Search, Moon, Sun, Truck, Drill,  Trash, Home, ChartBar, Sliders, Users, File } from 'lucide-react';

export const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emissions, setEmissions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [excavationData, setExcavationData] = useState([]);
  const [transportationData, setTransportationData] = useState([]);
  const [blastingData, setBlastingData] = useState([]);
  const [powerWaterData, setPowerWaterData] = useState([]);
  const [wasteData, setWasteData] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setEmissions([
      { date: '2024-01', value: 1000 },
      { date: '2024-02', value: 1200 },
      { date: '2024-03', value: 900 },
      { date: '2024-04', value: 1500 },
    ]);
    setAlerts([
      { id: 1, title: 'High Emission Level', description: 'Excavation area exceeding threshold' },
      { id: 2, title: 'Maintenance Due', description: 'Vehicle XYZ123 requires servicing' },
    ]);
    setExcavationData([
      { equipment: 'Excavator X', status: 'Active', emissions: 500 },
      { equipment: 'Excavator Y', status: 'Idle', emissions: 200 },
      { equipment: 'Excavator Z', status: 'Maintenance', emissions: 0 },
    ]);
    setTransportationData([
      { vehicle: 'Truck A', fuel: 100, emissions: 50 },
      { vehicle: 'Truck B', fuel: 75, emissions: 40 },
      { vehicle: 'Truck C', fuel: 120, emissions: 60 },
    ]);
    setBlastingData([
      { date: '2024-03-15', explosive: 'Dynamite', emissions: 80 },
      { date: '2024-04-01', explosive: 'ANFO', emissions: 60 },
      { date: '2024-04-20', explosive: 'Emulsion', emissions: 70 },
    ]);
    setPowerWaterData([
      { type: 'Electricity', usage: 5000, emissions: 3000 },
      { type: 'Water', usage: 20000, emissions: 500 },
    ]);
    setWasteData([
      { type: 'Metal', amount: 500, disposal: 'Recycling', emissions: 50 },
      { type: 'Plastic', amount: 200, disposal: 'Landfill', emissions: 80 },
      { type: 'Organic', amount: 800, disposal: 'Composting', emissions: 20 },
    ]);
  }, []);

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <div className="bg-blue-950 text-white p-6 flex flex-col space-y-4">
        <div className="font-bold text-2xl">
          Mine Operator Dashboard
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Home className="w-5 h-5" />
          <span>Overview</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <ChartBar className="w-5 h-5" />
          <span>Activity Management</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Trash className="w-5 h -5" />
          <span>Waste Management</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <File className="w-5 h-5" />
          <span>Reporting</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Users className="w-5 h-5" />
          <span>User Management</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <Sliders className="w-5 h-5" />
          <span>Settings</span>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="mt-auto">
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Emissions Summary */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Total Emissions Summary</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={emissions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2">
              <li>Updated emission factors for Excavator X</li>
              <li>New waste disposal record added</li>
              <li>Monthly report generated</li>
            </ul>
          </div>

          {/* Alerts and Notifications */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Alerts and Notifications</h2>
            {alerts.map((alert) => (
              <div key={alert.id} className="border-l-4 border-red-500 bg-red-100 dark:bg-red-900 dark:text-white p-4 mb-2">
                <h3 className="text-lg font-semibold">{alert.title}</h3>
                <p>{alert.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              <Truck className="w-5 h-5 mr-2" />
              Transportation Management
            </h2>
            <div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={transportationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vehicle" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="fuel" stroke="#8884d8" />
                  <Line type="monotone" dataKey="emissions" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Add other Activity Management Panels here */}

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              <Drill className="w-5 h-5 mr-2" />
              Blasting Operations
            </h2>
            <ul className="space-y-2">
              {blastingData.map((blast, index) => (
                <li key={index}>
                  <div>Date: {blast.date}</div>
                  <div>Explosive: {blast.explosive}</div>
                  <div>Emissions: {blast.emissions}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {/* <Electricity className="w-5 h-5 mr-2" /> */}
              Power and Water Management
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={powerWaterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="#8884d8" />
                <Bar dataKey="emissions" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              <Drill className="w-5 h-5 mr-2" />
              Excavation Management
            </h2>
            <ul className="space-y-2">
              {excavationData.map((excavation, index) => (
                <li key={index}>
                  <div>Equipment: {excavation.equipment}</div>
                  <div>Status: {excavation.status}</div>
                  <div>Emissions: {excavation.emissions}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            <Trash className="w-5 h-5 mr-2" />
            Waste Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Waste Tracking</h3>
              <ul className="space-y-2">
                {wasteData.map((waste, index) => (
                  <li key={index}>
                    <div>Type: {waste.type}</div>
                    <div>Amount: {waste.amount}</div>
                    <div>Disposal: {waste.disposal}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Emissions from Waste</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={wasteData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="emissions" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Reporting and Analytics</h2>
          {/* Add components for emission reports and graphs/charts */}
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          {/* Add components for RBAC and activity log */}
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p -6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          {/* Add components for emission factors and system configurations */}
        </div>
      </div>
    </div>
  );
};

