import { Options } from 'highcharts';
import { Row } from '../types/data.types';
import { normalizeDate } from './formatters';

export const csvConverter = (csv: string): Row[] => {
  const computeConversion = (obj: Row): Row =>
    Object.assign(obj, {
      conversion: isNaN(Number(obj.trials) / Number(obj.installs))
        ? 0
        : (Number(obj.trials) / Number(obj.installs)).toFixed(2),
    });

  const lines = csv ? csv.split('\n') : [];
  const result: Row[] = [];
  const headers: (string | any)[] = lines[0]
    .split(',')
    .map((header) => header.match(/\w+/))
    .flat(1);

  for (let i = 1; i < lines.length - 1; i++) {
    const obj = {} as Row;
    const currentLine = lines[i].split(',');

    headers.map((header: keyof Row, idx) => {
      switch (header) {
        case 'state':
          obj[header] = currentLine[idx]?.replace(/['"]+/g, '');
          break;
        case 'city':
          obj[header] = currentLine[idx]?.replace(/['"]+/g, '');
          break;
        case 'date':
          obj[header] = normalizeDate(currentLine[idx]?.replace(/['"]+/g, ''));
          break;
        case 'installs':
          obj[header] = Number(currentLine[idx]?.replace(/['"]+/g, ''));
          break;
        case 'trials':
          obj[header] = Number(currentLine[idx]?.replace(/['"]+/g, ''));
          break;
        default:
          break;
      }
    });

    result.push(computeConversion(obj));
  }

  return result;
};

export const getAltChartData = (csvData: Row[], filter: string, splicedTo?: number, width?: number): Options => {
  const filteredData = csvData.filter(({ date }: Row) => date === normalizeDate(filter)).splice(0, splicedTo);
  const installsData = filteredData.map(({ installs }: Row) => installs);
  const trialsData = filteredData.map(({ trials }: Row) => trials);
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
        text: filter,
      },
    },
    series: [
      {
        type: 'line',
        name: 'Installs',
        data: installsData,
      },
      {
        type: 'line',
        name: 'Trials',
        data: trialsData,
      },
    ],
  };
};
