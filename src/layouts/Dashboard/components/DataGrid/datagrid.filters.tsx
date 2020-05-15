import React from 'react';
import { FilterRendererProps } from 'react-data-grid';

export const DefaultFilterRenderer: React.ComponentType<FilterRendererProps<any>> = ({ value, onChange }) => {
  return (
    <div className="rdg-filter-container">
      <input className="rdg-filter" value={value as string} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};
