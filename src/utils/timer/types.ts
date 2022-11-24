export enum TimerType {
  Seconds = 'seconds',
  Minutes = 'minutes',
  Hours = 'hours',
  Days = 'days',
}

export enum TTime {
  Day = 'day',
  Month = 'month',
  Year = 'year',
  Seconds = 'seconds',
  Minutes = 'minutes',
  Hours = 'hours',
  StringMonth = 'stringMonth'
}

export type TParseTime = {
  duration: number;
  type?: TimerType;
  formatter?: (TimerType) => string;
};
