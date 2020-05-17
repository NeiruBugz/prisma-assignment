import React, { FC, useEffect, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAltChartData } from '../../../../utils';
import { ChartProps } from '../../../../interfaces/data.interface';

export const Chart: FC<ChartProps> = ({ chartData, date, width, splicedTo }) => {
  const [chart, setChart] = useState();
  useEffect(() => {
    setChart(getAltChartData(chartData, date, splicedTo));
  }, [chartData, date, splicedTo]);

  return chart ? <HighchartsReact higcharts={Highcharts} options={chart} /> : null;
};
