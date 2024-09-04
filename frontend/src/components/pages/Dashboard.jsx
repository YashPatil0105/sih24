import React from 'react';
import Sidebar from './components/Sidebar';
import OverviewPanel from './components/OverviewPanel';

function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        </header>
        <OverviewPanel />
      </div>
    </div>
  );
}

export default Dashboard;
