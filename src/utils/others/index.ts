import { TError } from '../../types/index';
import { ECompareValue } from '../types';

function compareValue(
  val1: string,
  val2: string,
  mode: ECompareValue.Standart
): boolean;
function compareValue(
  val1: string,
  val2: string,
  mode: ECompareValue.LoverCase
): boolean;
function compareValue(
  val1: string,
  val2: string,
  mode: ECompareValue.Substring
): boolean;
function compareValue(
  val1: string,
  val2: string,
  mode: ECompareValue.SubstringLower
): boolean;
function compareValue(
  val1: (string | number)[],
  val2: string | number,
  mode: ECompareValue.EveryOf
): boolean;
function compareValue(
  val1: (string | number)[],
  val2: string | number,
  mode: ECompareValue.SomeOf
): boolean;
function compareValue(
  val1: string[],
  val2: string,
  mode: ECompareValue.EveryOfLower
): boolean;
function compareValue(
  val1: string[],
  val2: string,
  mode: ECompareValue.SomeOfLower
): boolean;

function compareValue(val1, val2, mode) {
  const __mode = {
    [ECompareValue.Standart]: () => val1 === val2,
    [ECompareValue.LoverCase]: () => val1.toLowerCase() === val2.toLowerCase(),
    [ECompareValue.Substring]: () => val1.indexOf(val2) >= 0,
    [ECompareValue.SubstringLower]: () =>
      val1.toLowerCase().indexOf(val2.toLowerCase()) >= 0,
    [ECompareValue.EveryOf]: () => val1.every((v) => v === val2),
    [ECompareValue.SomeOf]: () => val1.some((v) => v === val2),
    [ECompareValue.EveryOfLower]: () =>
      val1.every((v) => v.toLowerCase() === val2.toLowerCase()),
    [ECompareValue.SomeOfLower]: () =>
      val1.some((v) => v.toLowerCase() === val2.toLowerCase()),
  };

  return __mode[mode]();
}

function getNodeByPath<T, R>({
  node,
  path,
}: {
  node: T;
  path: string;
}): R | TError {
  let splitPath = path.split('/');
  return splitPath.reduce((value: R | TError, part) => {
    if (!value) {
      value = node[part];
    } else {
      value = value[part];
    }
    if (value === undefined && typeof node === 'object' && !(part in node))
      value = {
        type: 'error',
        message:
          'current value path is incorrect. please check value path and try again',
      } as TError;
    return value;
  }, null);
}

export { getNodeByPath, compareValue };
