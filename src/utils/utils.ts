export function interval(
  value: number,
  range: {
    from: number;
    to: number;
  }
): {
  isValid: boolean;
  where: undefined | 'from' | 'to';
} {
  let where;
  if (value <= range.from) {
    where = 'from';
  } else if (value <= range.to) {
    where = 'to';
  }
  return {
    isValid: value >= range.from && value <= range.to,
    where,
  };
}

export function compareValue(val1, val2, mode = 'standart') {
  console.log('compare');
  const __mode = {
    standart: () => val1 === val2,
    loverCase: () => val1.toLowerCase() === val2.toLowerCase(),
    substring: () => val1.indexOf(val2) >= 0,
    substringLower: () => val1.toLowerCase().indexOf(val2.toLowerCase()) >= 0,
    everyOf: () => val1.every((v) => v === val2),
    someOf: () => val1.some((v) => v === val2),
    everyOfLower: () =>
      val1.every((v) => v.toLowerCase() === val2.toLowerCase()),
    someOfLower: () => val1.some((v) => v.toLowerCase() === val2.toLowerCase()),
  };

  return __mode[mode]();
}

export function getNodeByPath({ node, path }) {
  let splitPath = path.split('/');
  return splitPath.reduce((value, part) => {
    if (!value) {
      value = node[part];
    } else {
      value = value[part];
    }
    if (value === undefined || value === null) value = {};
    return value;
  }, null);
}
