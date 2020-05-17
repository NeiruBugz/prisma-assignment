export type Row = {
  state: string;
  city: string;
  installs: number;
  trials: number;
  date: string;
  conversion?: number;
};

export enum GridHeaders {
  'state',
  'city',
  'installs',
  'trials',
  'date',
}

export type DataGridHeaders = string[];

export type ChartData = {
  installs: string;
  trials: string;
  date: string;
};
