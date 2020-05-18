export type GridProps<T> = {
  data: Row[];
  tableWidth: number;
  customFilters: any[];
};

export type ChartProps = {
  chartData: Row[];
  date: string;
  splicedTo?: number;
  width?: number;
};

export type Row = {
  state: string;
  city: string;
  installs: number;
  trials: number;
  date: string;
  conversion?: number;
};
