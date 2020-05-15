import { Column } from 'react-data-grid';

import { Row } from '../../../../types/row.types';
import { DateFormatter, DigitFormatter, IndexFormatter, PercentFormatter } from './datagrid.formatters';
import { DefaultFilterRenderer } from './datagrid.filters';

const applyDefaultColumnsParams = <T extends {}>(columns: Column<T>[]): Column<T>[] => {
  const defaultProps: Partial<Column<T>> = {
    sortable: true,
    resizable: true,
  };

  const enrichedColumns = columns.map((c) => ({ ...defaultProps, ...c }));

  enrichedColumns.unshift({
    key: 'index',
    name: '№',
    formatter: IndexFormatter,
    sortable: true,
    width: '40px',
  });

  return enrichedColumns;
};

export const DataColumns: Column<Row>[] = applyDefaultColumnsParams([
  {
    key: 'date',
    name: 'Date',
    width: '200px',
    filterRenderer: DefaultFilterRenderer,
    formatter: DateFormatter,
  },
  {
    key: 'state',
    name: 'State',
    width: '200px',
    filterRenderer: DefaultFilterRenderer,
  },
  {
    key: 'city',
    name: 'City',
    width: '200px',
    filterRenderer: DefaultFilterRenderer,
  },
  {
    key: 'installs',
    name: 'Installs',
    width: '200px',
    filterRenderer: DefaultFilterRenderer,
    formatter: DigitFormatter,
  },
  {
    key: 'trials',
    name: 'Trials',
    width: '200px',
    filterRenderer: DefaultFilterRenderer,
    formatter: DigitFormatter,
  },
  {
    key: 'conversion',
    name: 'Conversion',
    formatter: PercentFormatter,
    filterRenderer: DefaultFilterRenderer,
    width: '200px',
  },
]);

export const initialFilters = {
  date: '2019-12-31',
  state: '',
  city: '',
  installs: '',
  trials: '',
  conversion: '',
};

export const clearedFilters = {
  date: '',
  state: '',
  city: '',
  installs: '',
  trials: '',
  conversion: '',
};
