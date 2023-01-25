import { TextField } from '@mui/material';
import { selectionColor } from './../../components/PartyComponent/parts/Chat/controls/Messages/controls/Message/Message';
function setStylesByObject(el, classes) {
  const stringClasses = Object.keys(classes).reduce(
    (str, key) => str + `${key}: ${classes[key]};`,
    ''
  );
  return (el.style.cssText = stringClasses);
}

class Dom {
  
  byEl(el) {
    return document.querySelector(el);
  }

  byId(el, id) {
    return el.getElementById(id);
  }

  byClass(el, className) {
    return el.querySelector(`.${className}`);
  }

  getMeasureText(el, font = "16px times new roman") {
    function displayTextWidth(text, font) {
      let canvas = displayTextWidth.canvas || (displayTextWidth.canvas = document.createElement("canvas"));
      let context = canvas.getContext("2d");
      context.font = font;
      let metrics = context.measureText(text);
      return metrics.width;
    }
    return displayTextWidth(el.value, font)
  }
  insertText(el: HTMLInputElement, inp: string) {
    const selectionStart = el.selectionStart
    const selectionEnd = el.selectionEnd
    const value = el.value
    return value.slice(0, selectionStart) + inp + value.slice(selectionEnd, value.length - 1)
  }
  selectAndLight (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    setTimeout(() => {
      el.style.background = selectionColor
      setTimeout(() => {
        el.style.background = null
      }, 1000)
    }, 700)
  }
  rect(el: HTMLElement): {
    x: number;
    y: number;
    height: number;
    top: number;
    width: number;
    bottom: number;
    left: number;
    right: number;
  } {
    return el.getBoundingClientRect();
  }
}

const $ = new Dom();

export { setStylesByObject, $ };
