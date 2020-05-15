import React, { useCallback, useEffect, useState } from 'react';

import { DataGrid } from './components/DataGrid/DataGrid';
import { Chart } from './components/Chart/Chart';

import { csvConverter, formatDate } from '../../utils';
import { Row } from '../../types/row.types';
import { Input, Loader } from '../../components';

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

  const handleInputChange = async (evt: React.SyntheticEvent<HTMLInputElement>) => {
    setSpliceTo(Number(evt.currentTarget.value));
  };

  return (
    <section className="dashboard">
      {data?.length ? (
        <>
          <h2>
            Chart data for {formatDate(filterDate)} spliced from 0 to&nbsp;{spliceTo === 0 ? 100 : spliceTo} (max:
            {data?.length})
          </h2>
          <Input
            value={spliceTo}
            onChange={handleInputChange}
            label="To change data size enter a number: "
            type="number"
            className="dashboard__input input--base"
            placeholder="100"
            defaultValue={spliceTo}
          />
          <Chart chartData={data} width={width} date={filterDate} splicedTo={spliceTo} />
          <DataGrid data={data} tableWidth={width} customFilters={[]} />
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};
