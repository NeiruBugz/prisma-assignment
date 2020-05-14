import React, { useCallback, useMemo, useState } from 'react';
import ReactDataGrid, { SortDirection } from 'react-data-grid';
import { Row } from '../../../../types/row.types';
import { DataColumns } from './datagrid.utils';

interface GridProps<T> {
  data: Row[];
}

const EmptyGrid = () => (
  <div style={{ textAlign: 'center' }}>
    Nothing to show
    <span lang="ja" title="ショボーン">
      (´・ω・`)
    </span>
  </div>
);

export const DataGrid = <T extends {}>({ data }: GridProps<T>) => {
  const [rows] = useState<Row[]>(data);
  const [[sortColumn, sortDirection], setSort] = useState<[string | keyof Row, SortDirection]>(['date', 'DESC']);

  const handleRowsSort = useCallback((columnKey: string | keyof Row, direction: SortDirection) => {
    setSort([columnKey, direction]);
  }, []);

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortDirection === 'NONE') return rows;

    let newSortedRows: Row[] = [...rows];

    const comparer = (a: any, b: any) => {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    };
    newSortedRows = newSortedRows.sort(comparer);

    return sortDirection === 'DESC' ? newSortedRows.reverse() : newSortedRows;
  }, [rows, sortColumn, sortDirection]);

  return (
    <ReactDataGrid
      width={1024}
      height={480}
      minColumnWidth={120}
      columns={DataColumns}
      rows={sortedRows}
      sortDirection={sortDirection}
      sortColumn={sortColumn}
      onSort={(sortedColumn, direction) => handleRowsSort(sortedColumn, direction)}
      emptyRowsRenderer={EmptyGrid}
      enableFilters
    />
  );
};
