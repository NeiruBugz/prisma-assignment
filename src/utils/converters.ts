import { ChartData, Row } from '../types/row.types';
import { formatDate } from './formatters';

export const csvConverter = (csv: string): Row[] => {
  const computeConversion = (obj: Row): Row =>
    Object.assign(obj, { conversion: (Number(obj.trials) / Number(obj.installs)).toFixed(2) });

  const lines = csv.split('\n');
  const result: any = [];
  let headers: (string | any)[] = lines[0].split(',');
  headers = headers.map((header) => header.match(/\w+/)).flat();

  for (let i = 1; i < lines.length - 1; i++) {
    const obj: Row = {} as Row;
    const currentLine = lines[i].split(',');

    for (let j = 0; j < headers?.length; j++) {
      obj[headers[j] as keyof Row] = currentLine[j]?.replace(/['"]+/g, '');
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

export const getAltChartData = (csvData: Row[], filter: string, splicedTo?: number): any => {
  const filteredData = csvData.filter((row: Row) => row.date === filter).splice(0, splicedTo);
  const installs = filteredData.map((row: Row) => Number(row.installs));
  const trials = filteredData.map((row: Row) => Number(row.trials));
  return {
    title: {
      text: 'Install/Trials',
    },
    chart: {
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
        tools: {
          selection: false,
          pan: false,
        },
      },
    },
    xaxis: {
      categories: new Array(splicedTo).fill(formatDate(filter)),
    },
    series: [
      {
        name: 'installs',
        data: installs,
      },
      {
        name: 'trials',
        data: trials,
      },
    ],
    tooltip: {
      shared: true,
      onDatasetHover: {
        highlightDataSeries: true,
      },
      x: {
        title: {
          formatter: (seriesName: any) => seriesName,
        },
      },
      y: {
        title: {
          formatter: (seriesName: any) => seriesName,
        },
      },
    },
  };
};
