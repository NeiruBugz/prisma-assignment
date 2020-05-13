import React from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Dashboard } from './layouts/Dashboard/Dashboard';

export const App: React.FC<{}> = () => {
  return (
    <div className="app">
      <Sidebar />
      <Dashboard />
    </div>
  );
};
