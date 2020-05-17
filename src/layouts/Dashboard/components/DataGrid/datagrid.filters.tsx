import React, { ComponentType } from 'react';
import { FilterRendererProps } from 'react-data-grid';

export const DefaultFilterRenderer: ComponentType<FilterRendererProps<any>> = ({
  value,
  onChange,
  column: { key, width },
}) => {
  let customWidth = String(width);
  if (key === 'installs' || key === 'trials') {
    customWidth = '64px';
  } else if (key === 'conversion') {
    customWidth = '100px';
  }
  return (
    <div className="rdg-filter-container">
      <input
        style={{ width: customWidth }}
        className="rdg-filter"
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
