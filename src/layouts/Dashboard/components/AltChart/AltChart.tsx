import React, { FC, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getAltChartData } from '../../../../utils';
import { Row } from '../../../../types/row.types';
import { Loader } from '../../../../components';

export const AltChart: FC<{ data: Row[]; filterDate: string; width: number; splicedTo: number }> = ({
  data,
  filterDate,
  width,
  splicedTo,
}) => {
  const [chart, setChart] = useState();
  useEffect(() => {
    setChart(getAltChartData(data, filterDate, splicedTo));
  }, [data, filterDate, splicedTo]);

  console.log(chart);

  return chart !== undefined ? (
    <Chart options={chart} series={chart?.series} type="line" width={width} height={400} />
  ) : (
    <Loader />
  );
};
