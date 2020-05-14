import React, { useEffect, useState } from 'react';
import { DataGrid } from './components/DataGrid/DataGrid';

import { csvConverter } from '../../utils';

import { Row } from '../../types/row.types';

export const Dashboard = () => {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    fetch('https://prisma-assignment-api.herokuapp.com/api/csv-data')
      .then((response) => response.text())
      .then((result) => {
        const parsedCsv = csvConverter(result);
        setRows(parsedCsv);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);
  return (
    <section className="dashboard">
      <DataGrid rows={rows} />
    </section>
  );
};
