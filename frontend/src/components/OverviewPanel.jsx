import React from 'react';

const OverviewPanel = () => {
  return (
    <div className="p-4 bg-gray-100 flex-1">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-gray-600">Total Emissions</h2>
          <p className="text-2xl font-bold">345 Tons</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-gray-600">Recent Activity</h2>
          <p className="text-2xl font-bold">12 Updates</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-gray-600">Alerts</h2>
          <p className="text-2xl font-bold">3 New</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewPanel;
