import { TParseTime } from './types';

export function parseTime({ duration, type, formatter }: TParseTime) {
  var seconds = Math.floor(duration / 1000);
  var minutes = Math.floor(duration / (1000 * 60));
  var hours = Math.floor(duration / (1000 * 60 * 60));
  var days = Math.floor(duration / (1000 * 60 * 60 * 24));

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
