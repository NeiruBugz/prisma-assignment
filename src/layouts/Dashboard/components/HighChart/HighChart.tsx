import React, { FC, useEffect, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Row } from '../../../../types/row.types';
import { getAltChartData } from '../../../../utils';

export const HighChart: FC<{ data: Row[]; filterDate: string; width: number; splicedTo: number }> = ({
  data,
  filterDate,
  width,
  splicedTo,
}) => {
  const [chart, setChart] = useState();
  useEffect(() => {
    setChart(getAltChartData(data, filterDate, splicedTo));
  }, [data, filterDate, splicedTo]);

  return chart ? <HighchartsReact higcharts={Highcharts} options={chart} /> : null;
};
