import React, { useEffect, useState } from 'react';

import { DataGrid } from './components/DataGrid/DataGrid';
import { Chart } from './components/Chart/Chart';

import { csvConverter, formatDate, getChartData } from '../../utils';
import { ChartData, Row } from '../../types/row.types';

export const Dashboard = () => {
  const [data, setData] = useState<Row[]>([]);
  const [width] = useState(1200);
  const [chartData, setChartData] = useState<ChartData[]>();
  const [filterDate] = useState('2019-12-31');

  useEffect(() => {
    fetch('./frontend-data.csv')
      .then((response) => response.text())
      .then((result) => {
        setData(csvConverter(result));
        setChartData(getChartData(csvConverter(result), filterDate));
      })
      .catch((error) => {
        setData([]);
        throw new Error(error);
      });
  }, [data, filterDate]);

  return (
    <section className="dashboard">
      {data?.length ? (
        <>
          <h2>
            Chart data for &nbsp;
            {formatDate(filterDate)}
          </h2>
          <Chart data={chartData} width={width} />
          <DataGrid data={data} tableWidth={width} />
        </>
      ) : (
        <svg
          version="1.1"
          id="L9"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 0 0"
          xmlSpace="preserve"
          width={128}
          height={128}
        >
          <path
            fill="#000"
            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      )}
    </section>
  );
};
