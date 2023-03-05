import { TError } from '../../types/index';
import { TDefaultReturnedTime, TimerType, TTime } from './types';

function parseTime({duration, type}: {
  duration: number,
  type: TimerType
}): number

function parseTime<T>({duration, formatter}: {
  duration: number,
  formatter: (value: TDefaultReturnedTime) => T 
}): T

 function parseTime({ duration, type, formatter }) {
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(duration / (1000 * 60));
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  let timeByType;
  let time: TDefaultReturnedTime = {
    seconds,
    minutes,
    hours,
    days,
  };

  if (typeof formatter === 'function') {
    timeByType = formatter(time);
  } else if (typeof type === 'string') {
    timeByType = time[type];
  } else {
    timeByType = time;
  }
  return timeByType;
}

function parseTimeByString(args: {
  time: string,
  type: TTime,
}): string | TError

function parseTimeByString<T>(args: {
  time: string,
  formatter: (val: Record<TTime, string>) => T
}): T | TError

function parseTimeByString({
  time,
  type,
  formatter,
}) {
  const date = new Date(time);
  if (date.toString() === 'Invalid Date') {
    return {
      type: 'error',
      message: date.toString()
    }
  }
  const addZero = (time) => (time <= 9 ? `0${time}` : String(time));
  const parseDate: Record<TTime, string> = {
    seconds: addZero(date.getSeconds()),
    minutes: addZero(date.getMinutes()),
    hours: addZero(date.getHours()),
    day: addZero(date.getDate()),
    month: addZero(date.getMonth() + 1),
    stringMonth: date.toLocaleString('en-US', {
      month: 'long',
    }),
    year: addZero(date.getFullYear()),
  };

  let timeByType;
  if (typeof formatter === 'function') {
    timeByType = formatter(parseDate);
  } else if (typeof type === 'string') {
    timeByType = parseDate[type];
  } else {
    timeByType = parseDate;
  }
  return timeByType;
}

export function makeTimeString(time?: Date): string {
  return Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
    .format(time ? new Date(time) : new Date()).replace(',', '')
}

export {
  parseTime,
  parseTimeByString
}
