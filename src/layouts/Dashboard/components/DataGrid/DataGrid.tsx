import React, { useCallback, useMemo, useState } from 'react';
import ReactDataGrid, { Filters, SortDirection } from 'react-data-grid';

import { Row } from '../../../../types/row.types';
import { GridProps } from '../../../../interfaces/data.interface';

import { clearedFilters, DataColumns, initialFilters } from './datagrid.utils';
import { Button } from '../../../../components/Button';

const EmptyGrid = () => (
  <div style={{ textAlign: 'center' }}>
    Nothing to show
    <span lang="ja" title="ショボーン">
      (´・ω・`)
    </span>
  </div>
);

export const DataGrid = <T extends {}>({ data, tableWidth }: GridProps<T>) => {
  const [rows] = useState<Row[]>(data);
  const [[sortColumn, sortDirection], setSort] = useState<[string | keyof Row, SortDirection]>(['date', 'DESC']);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [enableFilters, setFiltersEnabled] = useState(false);
  const [disableButton, setButtonDisabled] = useState(false);

  const handleRowsSort = useCallback((columnKey: string | keyof Row, direction: SortDirection) => {
    setSort([columnKey, direction]);
  }, []);

  // const sortedRows = useMemo((): readonly Row[] => {
  //   if (sortDirection === 'NONE') return filteredRows;
  //
  //   let newSortedRows: Row[] = [...filteredRows];
  //
  //   const comparer = (a: any, b: any) => {
  //     return a[sortColumn] > b[sortColumn] ? 1 : -1;
  //   };
  //   newSortedRows = newSortedRows.sort(comparer);
  //
  //   return sortDirection === 'DESC' ? newSortedRows.reverse() : newSortedRows;
  // }, [rows, sortColumn, sortDirection]);

  const clearFilters = useCallback(() => {
    setFilters(clearedFilters);
    setButtonDisabled(true);
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      return (
        (filters.city ? r.city.includes(filters.city) : true) &&
        (filters.state ? r.state === filters.state : true) &&
        (filters.date ? r.date === filters.date : true) &&
        (filters.installs ? r.installs === filters.installs : true) &&
        (filters.triallls ? r.trials === filters.trials : true)
      );
    });
  }, [rows, filters.city, filters.state, filters.date, filters.installs, filters.triallls, filters.trials]);

  const toggleFilters = useCallback(() => setFiltersEnabled(!enableFilters), [enableFilters]);

  return (
    <>
      <section className="datagrid__controls">
        <Button
          label="Clear filters"
          onClick={clearFilters}
          className="datagrid__button base-button"
          disabled={disableButton}
        />
        <Button label="Toggle filters" onClick={toggleFilters} className="datagrid__button base-button" />
      </section>
      <ReactDataGrid
        width={tableWidth}
        height={480}
        columns={DataColumns}
        rows={filteredRows}
        sortDirection={sortDirection}
        sortColumn={sortColumn}
        onSort={(sortedColumn, direction) => handleRowsSort(sortedColumn, direction)}
        emptyRowsRenderer={EmptyGrid}
        enableFilters={enableFilters}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </>
  );
};
