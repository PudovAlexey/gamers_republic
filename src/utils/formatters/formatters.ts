import { EMessageAdd } from "@/api/types";
import { TError } from "@/types/index";

function camelCaseToText(text: string): string {
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

function parseFileByType(file: File): EMessageAdd | TError {
  const { type } = file;
  if (/image/.test(type)) {
    return EMessageAdd.Img
  } else if (/video/.test(type)) {
    return EMessageAdd.Video
  } else if (/audio/.test(type)) {
    return EMessageAdd.Audio
  } else if (/application/.test(type)) {
    return EMessageAdd.File
  } else {
    return {
      type: 'error',
      message: 'unnoun type of file'
    }
  }
}

export { camelCaseToText, parseFileByType };
