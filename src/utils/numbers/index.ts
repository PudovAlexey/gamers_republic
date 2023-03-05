import { TError } from "../../types/index";

function randomUnit(min: number, max: number): number | TError {
    if (min > max) return {
        type: 'error',
        message: `max value mast to be greather than min value. minValue ${min} maxValue ${max}`
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function interval(
    value: number,
    range: {
      from: number;
      to: number;
    }
  ): boolean | TError {
    if (range.to < range.from) return {
        type: 'error',
        message: `you insert invalid value range.from ${range.from} mast be greather then range.to ${range.to}`
    }

    return value >= range.from && value <= range.to
  }

  export {
    randomUnit,
    interval
  }