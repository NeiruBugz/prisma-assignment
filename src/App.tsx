import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './layouts/Dashboard/Dashboard';

export const App: React.FC<{}> = () => {
  return (
    <div className="app">
      <Sidebar />
      <Dashboard />
    </div>
  );
};
