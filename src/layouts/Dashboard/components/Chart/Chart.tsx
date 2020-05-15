import React, { FC, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartProps } from '../../../../interfaces/data.interface';
import { ChartData } from '../../../../types/row.types';
import { getChartData } from '../../../../utils';

export const Chart: FC<ChartProps> = ({ chartData, width, date, splicedTo }) => {
  const [chart, setChart] = useState<ChartData[]>();
  useEffect(() => {
    setChart(getChartData(chartData, date).splice(0, splicedTo === 0 ? 100 : splicedTo));
  }, [chartData, date, splicedTo]);

  console.log(chart);

  return (
    <ResponsiveContainer width={width} height="40%">
      <LineChart width={width} height={400} data={chart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" dataKey="trials" />
        <YAxis yAxisId="right" orientation="right" dataKey="installs" />
        <Tooltip />
        <Legend />
        <Line dataKey="trials" type="monotone" stroke="blue" yAxisId="left" />
        <Line dataKey="installs" type="monotone" stroke="green" yAxisId="right" />
      </LineChart>
    </ResponsiveContainer>
  );
};
