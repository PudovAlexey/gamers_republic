import { TParseTime } from "./types";

export function parseTime({
  duration,
  type,
  formatter,
  toTimeParse = false,
}: TParseTime) {
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
  if (toTimeParse) {
    time = Object.keys(time).reduce((parse, key) => {
      parse[key] = time[key] < 10 ? `0${time[key]}` : time[key]
      return parse
    }, {})
  }
  if (typeof formatter === "function") {
    timeByType = formatter(seconds, minutes, hours, days);
  } else if (typeof type === "string") {
    timeByType = time[type];
  } else {
    timeByType = time;
  }
  return timeByType;
}
