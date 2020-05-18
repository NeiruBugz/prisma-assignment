import React from 'react';
import { FormatterProps } from 'react-data-grid';

export const IndexFormatter: React.ComponentType<FormatterProps> = ({ rowIdx }) => <>{rowIdx + 1}</>;

export const PercentFormatter: React.ComponentType<FormatterProps> = ({ row, column }) => {
  return <span>{row[column.key] ? `${row[column.key]}%` : '-'}</span>;
};

export const DigitFormatter: React.ComponentType<FormatterProps> = ({ row, column }) => (
  <span>{Number(row[column.key]) === 0 ? '-' : Number(row[column.key])}</span>
);
