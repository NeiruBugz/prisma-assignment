import React from 'react';
import { Column, FormatterProps } from 'react-data-grid';
import { Row } from '../../../../types/row.types';

export const IndexFormatter: React.ComponentType<FormatterProps> = ({ rowIdx }) => <>{rowIdx + 1}</>;

export const PercentFormatter: React.ComponentType<FormatterProps> = ({ row, column }) => {
  const data = row[column.key] ? `${row[column.key]}%` : '-';
  return <span>{data}</span>;
};

export const DateFormatter: React.ComponentType<FormatterProps> = ({ row, column }) => (
  <span>{row[column.key] ? new Date(row[column.key]).toLocaleString('ru') : '-'}</span>
);

export const DigitFormatter: React.ComponentType<FormatterProps> = ({ row, column }) => (
  <span>{Number(row[column.key])}</span>
);

export const applyDefaultColumnsParams = <T extends {}>(columns: Column<T>[]): Column<T>[] => {
  const defaultProps: Partial<Column<T>> = {
    sortable: true,
    resizable: true,
    width: '200px',
  };

  const enrichedColumns = columns.map((c) => ({ ...defaultProps, ...c }));

  enrichedColumns.unshift({
    key: 'index',
    name: '№',
    formatter: IndexFormatter,
    sortable: true,
  });

  return enrichedColumns;
};

export const DataColumns: Column<Row>[] = applyDefaultColumnsParams([
  {
    key: 'date',
    name: 'Date',
    // formatter: DateFormatter,
  },
  {
    key: 'state',
    name: 'State',
  },
  {
    key: 'city',
    name: 'City',
  },
  {
    key: 'installs',
    name: 'Installs',
    formatter: DigitFormatter,
  },
  {
    key: 'trials',
    name: 'Trials',
    formatter: DigitFormatter,
  },
  {
    key: 'conversion',
    name: 'Conversion',
    formatter: PercentFormatter,
  },
]);
