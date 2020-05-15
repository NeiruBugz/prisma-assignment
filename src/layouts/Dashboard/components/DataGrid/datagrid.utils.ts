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
    width: 10,
  });

  return enrichedColumns;
};

export const DataColumns: Column<Row>[] = applyDefaultColumnsParams([
  {
    key: 'date',
    name: 'Date',
    filterRenderer: DefaultFilterRenderer,
    formatter: DateFormatter,
  },
  {
    key: 'state',
    name: 'State',
    filterRenderer: DefaultFilterRenderer,
  },
  {
    key: 'city',
    name: 'City',
    filterRenderer: DefaultFilterRenderer,
  },
  {
    key: 'installs',
    name: 'Installs',
    filterRenderer: DefaultFilterRenderer,
    formatter: DigitFormatter,
    width: 80,
  },
  {
    key: 'trials',
    name: 'Trials',
    filterRenderer: DefaultFilterRenderer,
    formatter: DigitFormatter,
    width: 80,
  },
  {
    key: 'conversion',
    name: 'Conversion',
    formatter: PercentFormatter,
    filterRenderer: DefaultFilterRenderer,
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
