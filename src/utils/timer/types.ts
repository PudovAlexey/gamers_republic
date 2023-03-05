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

type TDefaultReturnedTime = {
  seconds: number,
  minutes: number,
  hours: number,
  days: number,
}

export type TParseTime = {
  duration: number;
  type?: TimerType;
  formatter?: (val: TimerType) => string;
};

export type {
  TDefaultReturnedTime
}
