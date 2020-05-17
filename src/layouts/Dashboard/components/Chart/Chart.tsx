import React, { FC, useEffect, useState } from 'react';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAltChartData } from '../../../../utils';
import { ChartProps } from '../../../../interfaces/data.interface';

export const Chart: FC<ChartProps> = ({ chartData, date, width, splicedTo }) => {
  const [chart, setChart] = useState<Options>({});
  useEffect(() => {
    setChart(getAltChartData(chartData, date, splicedTo === 0 ? 100 : splicedTo, width));
  }, [chartData, date, splicedTo]);

  return chart ? <HighchartsReact higcharts={Highcharts} options={chart} /> : null;
};
