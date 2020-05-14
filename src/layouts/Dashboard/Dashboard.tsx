import React, { useEffect, useState } from 'react';
import { csvToJSONConverter } from '../../utils';

export const Dashboard = () => {
  const [rows, setRows] = useState();

  useEffect(() => {
    fetch('https://prisma-assignment-api.herokuapp.com/api/csv-data')
      .then((response) => response.text())
      .then((result) => {
        const parsedCsv = csvToJSONConverter(result);
        debugger;
        setRows(parsedCsv);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);
  return <section className="dashboard">Dashboard</section>;
};
