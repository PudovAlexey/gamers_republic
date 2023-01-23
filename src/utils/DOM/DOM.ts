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
