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
