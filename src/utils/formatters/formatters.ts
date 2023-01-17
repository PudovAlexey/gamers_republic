import { EMessageAdd } from "../../api/types";

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

function parseFileByType(file: File): EMessageAdd {
  const { type } = file;
  if (/image/.test(type)) {
    return EMessageAdd.Img
  } else if (/video/.test(type)) {
    return EMessageAdd.Video
  } else if (/audio/.test(type)) {
    return EMessageAdd.Audio
  } else if (/application/.test(type)) {
    return EMessageAdd.File
  }
}

export { camelCaseToText, parseFileByType };
