import React from 'react';
import { FormatterProps } from 'react-data-grid';
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
