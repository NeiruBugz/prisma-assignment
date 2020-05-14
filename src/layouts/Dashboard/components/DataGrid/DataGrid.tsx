import React, { FC } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Row } from '../../../../types/row.types';
import { DataColumns } from './datagrid.utils';

interface DataGridProps {
  rows: Row[] | any;
}

export const DataGrid: FC<DataGridProps> = ({ rows }) => {
  return (
    rows?.length && <ReactDataGrid columns={DataColumns} rows={rows} width={1366} height={768} minColumnWidth={150} />
  );
};
