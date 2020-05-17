import { Row } from '../types/row.types';

export interface GridProps<T> {
  data: Row[];
  tableWidth: number;
  customFilters: any[];
}

export interface ChartProps {
  chartData: Row[];
  date: string;
  splicedTo?: number;
  width?: number;
}
