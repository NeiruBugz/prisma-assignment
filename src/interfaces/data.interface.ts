import { LineChartProps } from 'recharts';
import { ChartData, Row } from '../types/row.types';

export interface GridProps<T> {
  data: Row[];
  tableWidth: number;
  customFilters: any[];
}

export interface ChartProps extends LineChartProps {
  chartData: ChartData[] | undefined;
}
