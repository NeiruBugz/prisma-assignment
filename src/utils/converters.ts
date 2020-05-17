import { Options } from 'highcharts';
import { Row } from '../types/row.types';
import { formatDate } from './formatters';

export const csvConverter = (csv: string): Row[] => {
  const computeConversion = (obj: Row): Row =>
    Object.assign(obj, {
      conversion: isNaN(Number(obj.trials) / Number(obj.installs))
        ? 0
        : (Number(obj.trials) / Number(obj.installs)).toFixed(2),
    });

  const lines = csv ? csv.split('\n') : [];
  const result: any = [];
  const headers: (string | any)[] = lines[0]
    .split(',')
    .map((header) => header.match(/\w+/))
    .flat(1);

  for (let i = 1; i < lines.length - 1; i++) {
    const obj = {} as Row;
    const currentLine = lines[i].split(',');

    headers.map((header: string, idx) => {
      // @ts-ignore
      obj[header] =
        header === 'trials' || header === 'installs'
          ? Number(currentLine[idx]?.replace(/['"]+/g, ''))
          : currentLine[idx]?.replace(/['"]+/g, '');
    });

    result.push(computeConversion(obj));
  }

  return result;
};

export const getAltChartData = (csvData: Row[], filter: string, splicedTo?: number, width?: number): Options => {
  const filteredData = csvData.filter((row: Row) => row.date === filter).splice(0, splicedTo);
  const installs = filteredData.map((row: Row) => Number(row.installs));
  const trials = filteredData.map((row: Row) => Number(row.trials));
  return {
    title: {
      text: 'Install/Trials',
    },
    chart: {
      zoomType: 'x',
      zoomKey: 'ctrl',
      width,
    },
    xAxis: {
      title: {
        text: `${formatDate(filter)}`,
      },
    },
    series: [
      {
        type: 'line',
        name: 'installs',
        data: installs,
      },
      {
        type: 'line',
        name: 'trials',
        data: trials,
      },
    ],
  };
};
