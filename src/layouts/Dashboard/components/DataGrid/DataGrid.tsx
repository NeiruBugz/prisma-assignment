import React, { FC, useCallback, useMemo, useState } from 'react';
import ReactDataGrid, { SortDirection } from 'react-data-grid';
import { Row } from '../../../../types/row.types';
import { DataColumns } from './datagrid.utils';

interface DataGridProps {
  data: Row[] | any;
}

const EmptyGrid = () => (
  <div style={{ textAlign: 'center' }}>
    Nothing to show
    <span lang="ja" title="ショボーン">
      (´・ω・`)
    </span>
  </div>
);

// @ts-ignore
export const DataGrid: FC<DataGridProps> = ({ data }) => {
  const [rows] = useState<Row[]>(data);
  const [[sortColumn, sortDirection], setSort] = useState<[string, SortDirection]>(['index', 'NONE']);

  const handleRowsSort = useCallback((columnKey: string, direction: SortDirection) => {
    setSort([columnKey, direction]);
  }, []);

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortDirection === 'NONE') return rows;

    // eslint-disable-next-line no-shadow
    let sortedRows: Row[] = [...rows];

    const comparer = (a: { [x: string]: number }, b: { [x: string]: number }) => {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    };

    switch (sortColumn) {
      case 'date':
        break;
      default:
        // @ts-ignore
        sortedRows = sortedRows.sort(comparer);
        break;
    }

    debugger;

    return sortDirection === 'DESC' ? sortedRows.reverse() : sortedRows;
  }, [rows, sortColumn, sortDirection]);

  return (
    sortedRows?.length && (
      <ReactDataGrid
        width={1366}
        height={768}
        minColumnWidth={150}
        columns={DataColumns}
        rows={sortedRows}
        onSort={handleRowsSort}
        sortDirection={sortDirection}
        emptyRowsRenderer={EmptyGrid}
      />
    )
  );
};
