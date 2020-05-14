import React from 'react';
import { Column, FormatterProps } from 'react-data-grid';
import { Row } from '../../../../types/row.types';

export const IndexFormatter: React.ComponentType<FormatterProps> = ({ rowIdx }) => <>{rowIdx + 1}</>;
export const PercentFormatter: React.ComponentType<FormatterProps> = ({ row, column }) => {
  const data = row[column.key] ? `${row[column.key]}%` : '-';
  return <span>{data}</span>;
};

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
  });

  return enrichedColumns;
};

export const DataColumns: Column<Row>[] = applyDefaultColumnsParams([
  {
    key: 'date',
    name: 'Date',
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
  },
  {
    key: 'trials',
    name: 'Trials',
  },
  {
    key: 'conversion',
    name: 'Conversion',
    formatter: PercentFormatter,
  },
]);
