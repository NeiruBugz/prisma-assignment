import React from 'react';
import { Column, FilterRendererProps, FormatterProps } from 'react-data-grid';

import { Row } from '../../../../types/row.types';

import { formatDate } from '../../../../utils';

const IndexFormatter: React.ComponentType<FormatterProps> = ({ rowIdx }) => <>{rowIdx + 1}</>;

const PercentFormatter: React.ComponentType<FormatterProps> = ({ row, column }) => {
  const data = row[column.key] ? `${row[column.key]}%` : '-';
  return <span>{data}</span>;
};

const DateFormatter: React.ComponentType<FormatterProps> = ({ row, column }) => (
  <span>{row[column.key] ? formatDate(row[column.key]) : '-'}</span>
);

const DigitFormatter: React.ComponentType<FormatterProps> = ({ row, column }) => <span>{Number(row[column.key])}</span>;

const DefaultFilterRenderer: React.ComponentType<FilterRendererProps<any>> = ({ value, onChange }) => {
  return (
    <div className="rdg-filter-container">
      <input className="rdg-filter" value={value as string} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

const applyDefaultColumnsParams = <T extends {}>(columns: Column<T>[]): Column<T>[] => {
  const defaultProps: Partial<Column<T>> = {
    sortable: true,
    resizable: true,
  };

  const enrichedColumns = columns.map((c) => ({ ...defaultProps, ...c }));

  enrichedColumns.unshift({
    key: 'index',
    name: '№',
    formatter: IndexFormatter,
    sortable: true,
    width: '40px',
  });

  return enrichedColumns;
};

export const DataColumns: Column<Row>[] = applyDefaultColumnsParams([
  {
    key: 'date',
    name: 'Date',
    width: '200px',
    filterRenderer: DefaultFilterRenderer,
    formatter: DateFormatter,
  },
  {
    key: 'state',
    name: 'State',
    width: '200px',
    filterRenderer: DefaultFilterRenderer,
  },
  {
    key: 'city',
    name: 'City',
    width: '200px',
    filterRenderer: DefaultFilterRenderer,
  },
  {
    key: 'installs',
    name: 'Installs',
    width: '200px',
    filterRenderer: DefaultFilterRenderer,
    formatter: DigitFormatter,
  },
  {
    key: 'trials',
    name: 'Trials',
    width: '200px',
    filterRenderer: DefaultFilterRenderer,
    formatter: DigitFormatter,
  },
  {
    key: 'conversion',
    name: 'Conversion',
    formatter: PercentFormatter,
    filterRenderer: DefaultFilterRenderer,
    width: '200px',
  },
]);

export const initialFilters = {
  date: '2019-12-31',
  state: '',
  city: '',
  installs: '',
  trials: '',
  conversion: '',
};

export const clearedFilters = {
  date: '',
  state: '',
  city: '',
  installs: '',
  trials: '',
  conversion: '',
};
