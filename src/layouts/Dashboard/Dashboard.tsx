import React, { useEffect, useState } from 'react';

import { Input, Loader } from '../../components';
import { Chart, DataGrid } from './components';

import { csvConverter, normalizeDate } from '../../utils';
import { Row } from '../../types/data.types';

export const Dashboard = () => {
  const [data, setData] = useState<Row[]>([]);
  const [width] = useState(1024);
  const [filterDate, setFilterDate] = useState('2019-12-31');
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

  const handleDateChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    setFilterDate(evt.currentTarget.value);
  };

  return (
    <section className="dashboard">
      {data?.length ? (
        <>
          <h2>
            Chart data for {normalizeDate(filterDate)} spliced from 0 to&nbsp;{spliceTo === 0 ? 100 : spliceTo} (max:
            {data?.length})
          </h2>
          <p>Select an area for zoom</p>
          <Input
            value={spliceTo}
            onChange={handleInputChange}
            label="To change data size enter a number: "
            type="number"
            className="dashboard__input input--base"
            placeholder="100"
            defaultValue={spliceTo}
          />
          <Input
            className="datagrid__input datagrid__input--filter"
            value={filterDate}
            onChange={handleDateChange}
            id="startDate"
            type="date"
            label="Pick a date"
            labelClassName="datagrid__label--filter input__label"
          />
          <Chart chartData={data} date={filterDate} width={width} splicedTo={spliceTo} />
          <DataGrid data={data} tableWidth={width} customFilters={[]} />
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};
