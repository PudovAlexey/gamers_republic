import { TParseTime, TTime } from './types';

export function parseTime({ duration, type, formatter }: TParseTime) {
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(duration / (1000 * 60));
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  let timeByType;
  let time: Record<string, number> = {
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

export function parseTimeByString({
  time,
  type,
  formatter,
}: {
  time: string;
  type?: TTime;
  formatter?: (values: Record<TTime, string>) => string;
}) {
  const date = new Date(time);
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

export function makeTimeString(time) {
  return Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
     day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
    .format(time ? new Date(time) : new Date())
    .split(' ')
    .map((date, idx) => {
        if (idx === 0) {
           return date.split('.')
            .reverse()
            .join('.')
            .replaceAll(',', '')
        } else {
            return date.replaceAll(',', '')
        }
    })
    .join(' ');
}
