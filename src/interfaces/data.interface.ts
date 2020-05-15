import { LineChartProps } from 'recharts';
import { ChartData, Row } from '../types/row.types';

export interface GridProps<T> {
  data: Row[];
  tableWidth: number;
}

export interface ChartProps extends LineChartProps {
  data: ChartData[] | undefined;
}
