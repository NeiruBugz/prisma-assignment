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

export const DateFilterRenderer: ComponentType<FilterRendererProps<any>> = ({ value, onChange }) => {
  return (
    <div className="rdg-filter-container">
      <section className="datagrid__filters datagrid__filters--date">
        <div className="label-from">
          <span>From: </span>
          <input
            className="rdg-filter filter__input--from"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            id="startDate"
          />
        </div>
        <div className="label-to">
          <span>To:</span>
          <input
            className="rdg-filter filter__input--to"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            id="endDate"
          />
        </div>
      </section>
    </div>
  );
};
