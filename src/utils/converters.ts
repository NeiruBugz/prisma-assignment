import { ChartData, Row } from '../types/row.types';

const computeConversion = (obj: any): Row =>
  Object.assign(obj, { conversion: (Number(obj.trials) / Number(obj.installs)).toFixed(2) });

export const csvConverter = (csv: string): Row[] => {
  const lines = csv.split('\n');
  const result: any = [];
  let headers: (string | any)[] = lines[0].split(',');
  headers = headers.map((header) => header.match(/\w+/)).flat();

  for (let i = 1; i < lines.length - 1; i++) {
    const obj: any = {};
    const currentLine = lines[i].split(',');
    for (let j = 0; j < headers?.length; j++) {
      obj[headers[j]] = currentLine[j]?.replace(/['"]+/g, '');
    }

    result.push(computeConversion(obj));
  }

  return result;
};

export const getChartData = (nastyData: Row[], filter: string): ChartData[] => {
  const filteredData = nastyData.filter((row: Row) => row.date === filter);
  return filteredData.map(({ installs, trials, date }: Row) => {
    return {
      installs,
      trials,
      date,
    };
  });
};
