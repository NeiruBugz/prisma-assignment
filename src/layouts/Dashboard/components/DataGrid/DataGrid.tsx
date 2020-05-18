import React, { useCallback, useMemo, useState } from 'react';
import ReactDataGrid, { Filters, SortDirection } from 'react-data-grid';

import { Input } from '../../../../components/Input';
import { Button } from '../../../../components/Button';

import { GridProps, Row } from '../../../../types/data.types';

import { clearedFilters, DataColumns, initialFilters } from './datagrid.utils';
import { stringToDateStringParse } from '../../../../utils';

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
  const [[sortColumn, sortDirection], setSort] = useState<[string | keyof Row, SortDirection]>(['date', 'ASC']);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [enableFilters, setFiltersEnabled] = useState(true);
  const [disableButton, setButtonDisabled] = useState(false);
  const [startDate, setStartDate] = useState<string>('2019-12-31');
  const [endDate, setEndDate] = useState<string>('2019-12-31');

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

    const compareDates = (rowDate: string, fromDate: string, toDate: string) => {
      return (
        new Date(stringToDateStringParse(rowDate)) >= new Date(stringToDateStringParse(fromDate)) &&
        new Date(stringToDateStringParse(rowDate)) <= new Date(stringToDateStringParse(toDate))
      );
    };

    return newRows.filter((r) => {
      return (
        (filters.city ? r.city.toLowerCase().includes(filters.city.toLowerCase()) : true) &&
        (filters.state ? r.state.toLowerCase().includes(filters.state.toLowerCase()) : true) &&
        (startDate || endDate ? compareDates(r.date, startDate, endDate) : true) &&
        (filters.installs ? r.installs === Number(filters.installs) : true) &&
        (filters.trials ? r.trials === Number(filters.trials) : true)
      );
    });
  }, [
    rows,
    sortDirection,
    sortColumn,
    filters.city,
    filters.state,
    filters.installs,
    filters.trials,
    startDate,
    endDate,
  ]);

  const toggleFilters = useCallback(() => setFiltersEnabled(!enableFilters), [enableFilters]);

  const clearFilters = useCallback(() => {
    setFilters(clearedFilters);
    setButtonDisabled(true);
  }, []);

  const handleChange = useCallback((e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === 'startDate') {
      setStartDate(stringToDateStringParse(e.currentTarget.value));
    } else {
      setEndDate(stringToDateStringParse(e.currentTarget.value));
    }
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
        <Input
          className="datagrid__input datagrid__input--filter"
          value={startDate}
          onChange={handleChange}
          id="startDate"
          type="date"
          label="From: "
          labelClassName="datagrid__label--filter input__label"
        />
        <Input
          className="datagrid__input datagrid__input--filter"
          value={endDate}
          onChange={handleChange}
          id="endDate"
          type="date"
          label="To: "
          labelClassName="datagrid__label--filter input__label"
        />
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
        onFiltersChange={(updFilters) => setFilters(updFilters)}
      />
    </>
  );
};
