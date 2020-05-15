import React from 'react';
import { Column, FormatterProps } from 'react-data-grid';

import { Row } from '../../../../types/row.types';

import { formatDate } from '../../../../utils';

export const IndexFormatter: React.ComponentType<FormatterProps> = ({ rowIdx }) => <>{rowIdx + 1}</>;

export const PercentFormatter: React.ComponentType<FormatterProps> = ({ row, column }) => {
  const data = row[column.key] ? `${row[column.key]}%` : '-';
  return <span>{data}</span>;
};

export const DateFormatter: React.ComponentType<FormatterProps> = ({ row, column }) => (
  <span>{row[column.key] ? formatDate(row[column.key]) : '-'}</span>
);

export const DigitFormatter: React.ComponentType<FormatterProps> = ({ row, column }) => (
  <span>{Number(row[column.key])}</span>
);

export const applyDefaultColumnsParams = <T extends {}>(columns: Column<T>[]): Column<T>[] => {
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
    formatter: DateFormatter,
    width: '200px',
  },
  {
    key: 'state',
    name: 'State',
    width: '200px',
  },
  {
    key: 'city',
    name: 'City',
    width: '200px',
  },
  {
    key: 'installs',
    name: 'Installs',
    formatter: DigitFormatter,
    width: '200px',
  },
  {
    key: 'trials',
    name: 'Trials',
    formatter: DigitFormatter,
    width: '200px',
  },
  {
    key: 'conversion',
    name: 'Conversion',
    formatter: PercentFormatter,
    width: '200px',
  },
]);
