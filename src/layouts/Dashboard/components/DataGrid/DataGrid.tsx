import React, { FC, useCallback, useMemo, useState } from 'react';
import ReactDataGrid, { RowsUpdateEvent, SortDirection } from 'react-data-grid';
import { Row } from '../../../../types/row.types';
import { DataColumns } from './datagrid.utils';

interface DataGridProps {
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

// @ts-ignore
export const DataGrid: FC<DataGridProps> = ({ data }) => {
  const [rows, setRows] = useState<Row[]>(data);
  const [[sortColumn, sortDirection], setSort] = useState<[string, SortDirection]>(['date', 'DESC']);

  const handleRowsSort = useCallback((columnKey: string, direction: SortDirection) => {
    setSort([columnKey, direction]);
  }, []);

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortDirection === 'NONE') return rows;

    let newSortedRows: Row[] = [...rows];

    const comparer = (a: any, b: any) => {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    };

    switch (sortColumn) {
      case 'date':
        break;
      default:
        newSortedRows = newSortedRows.sort(comparer);
        break;
    }

    return sortDirection === 'DESC' ? newSortedRows.reverse() : newSortedRows;
  }, [rows, sortColumn, sortDirection]);

  // const handleRowsUpdate = useCallback(
  //   ({ fromRow, toRow, updated }: RowsUpdateEvent<Partial<Row>>) => {
  //     const newRows = [...sortedRows];
  //
  //     for (let i = fromRow; i <= toRow; i++) {
  //       newRows[i] = { ...newRows[i], ...updated };
  //     }
  //
  //     setRows(newRows);
  //   },
  //   [sortedRows],
  // );

  return (
    sortedRows?.length && (
      <ReactDataGrid
        width={1200}
        height={480}
        minColumnWidth={150}
        columns={DataColumns}
        rows={sortedRows}
        onSort={(sortedColumn, direction) => handleRowsSort(sortedColumn, direction)}
        sortDirection={sortDirection}
        emptyRowsRenderer={EmptyGrid}
      />
    )
  );
};
