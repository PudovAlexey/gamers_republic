function camelCaseToText(text) {
  return text
    .split('')
    .reduce(
      (text, letter, idx) =>
        text +
        (idx === 0
          ? letter.toUpperCase()
          : letter === letter.toUpperCase()
          ? ' ' + letter
          : letter),
      ''
    );
}

export { camelCaseToText };
