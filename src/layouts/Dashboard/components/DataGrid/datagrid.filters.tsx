import React, { ComponentType, useCallback, useState } from 'react';
import { FilterRendererProps } from 'react-data-grid';
import { stringToDateStringParse } from '../../../../utils';

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

export const DateFilterRenderer: ComponentType<FilterRendererProps<any>> = ({ value }) => {
  const [first, second] = value as string[];
  const [startDate, setStartDate] = useState<string>(first);
  const [endDate, setEndDate] = useState<string>(second);

  const handleChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === 'startDate') {
      setStartDate(stringToDateStringParse(e.currentTarget.value));
    } else {
      setEndDate(stringToDateStringParse(e.currentTarget.value));
    }
  }, []);

  debugger;
  return (
    <div className="rdg-filter-container">
      <section className="datagrid__filters datagrid__filters--date">
        <div className="label-from">
          <span>From: </span>
          <input
            className="rdg-filter filter__input--from"
            value={startDate}
            onChange={handleChange}
            id="startDate"
            type="date"
          />
        </div>
        <div className="label-to">
          <span>To:</span>
          <input
            className="rdg-filter filter__input--to"
            value={endDate}
            onChange={handleChange}
            id="endDate"
            type="date"
          />
        </div>
      </section>
    </div>
  );
};
