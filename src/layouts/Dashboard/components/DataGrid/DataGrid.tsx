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
  const [enableFilters, setFiltersEnabled] = useState(true);
  const [disableButton, setButtonDisabled] = useState(false);

  const handleRowsSort = useCallback((columnKey: string | keyof Row, direction: SortDirection) => {
    setSort([columnKey, direction]);
  }, []);

  const filteredRows = useMemo(() => {
    let newRows: Row[] = [...rows];

    const comparer = (a: any, b: any) => {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    };
    newRows = newRows.sort(comparer);

    if (sortDirection === 'DESC') {
      newRows = newRows.reverse();
    } else if (sortDirection === 'NONE') {
      newRows = rows;
    }

    return newRows.filter((r) => {
      return (
        (filters.city ? r.city.toLowerCase().includes(filters.city.toLowerCase()) : true) &&
        (filters.state ? r.state.toLowerCase().includes(filters.state.toLowerCase()) : true) &&
        (filters.date ? r.date.includes(filters.date) : true) &&
        (filters.installs ? r.installs === Number(filters.installs) : true) &&
        (filters.trials ? r.trials === Number(filters.trials) : true)
      );
    });
  }, [sortDirection, rows, sortColumn, filters.city, filters.state, filters.date, filters.installs, filters.trials]);

  const toggleFilters = useCallback(() => setFiltersEnabled(!enableFilters), [enableFilters]);

  const clearFilters = useCallback(() => {
    setFilters(clearedFilters);
    setButtonDisabled(true);
  }, []);

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
        height={525}
        columns={DataColumns}
        rows={filteredRows}
        sortDirection={sortDirection}
        sortColumn={sortColumn}
        onSort={(sortedColumn, direction) => handleRowsSort(sortedColumn, direction)}
        emptyRowsRenderer={EmptyGrid}
        enableFilters={enableFilters}
        filters={filters}
        onFiltersChange={setFilters}
        headerFiltersHeight={80}
      />
    </>
  );
};
