import React, { useEffect, useState } from 'react';

import { DataGrid } from './components/DataGrid/DataGrid';
import { Chart } from './components/Chart/Chart';

import { csvConverter, formatDate } from '../../utils';
import { Row } from '../../types/row.types';
import { Loader } from '../../components';

export const Dashboard = () => {
  const [data, setData] = useState<Row[]>([]);
  const [width] = useState(1440);
  const [filterDate] = useState('2019-12-31');
  const [spliceTo, setSpliceTo] = useState(100);

  useEffect(() => {
    fetch('./frontend-data.csv')
      .then((response) => response.text())
      .then((result) => {
        setData(csvConverter(result));
      })
      .catch((error) => {
        setData([]);
        throw new Error(error);
      });
  }, []);

  return (
    <section className="dashboard">
      {data?.length ? (
        <>
          <h2>
            Chart data for &nbsp;
            {formatDate(filterDate)}
            &nbsp; spliced from 0 to&nbsp;
            {spliceTo}
          </h2>
          <Chart chartData={data} width={width} date={filterDate} />
          <DataGrid data={data} tableWidth={width} customFilters={[]} />
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};
