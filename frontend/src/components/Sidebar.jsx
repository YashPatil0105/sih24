import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="flex items-center justify-center h-16">
        <h1 className="text-2xl font-bold">Mine Operator</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Dashboard</a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Excavation</a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Transportation</a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Blasting</a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Power & Water</a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Waste Management</a>
      </nav>
    </div>
  );
};

export default Sidebar;
