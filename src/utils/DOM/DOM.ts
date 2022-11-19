function setStylesByObject(el, classes) {
    const stringClasses = Object.keys(classes)
    .reduce((str, key) => 
    str + `${key}: ${classes[key]};`, "")
    console.log(stringClasses)
    return el.style.cssText = stringClasses
}

class Dom {
    constructor() {}

    byEl(el) {
        return document.querySelector(el)
    }

    byId(el, id) {
        return el.getElementById(id)
    }

    byClass(el, className) {
        return el.querySelector(`.${className}`)
    }

    rect(el) {
        return el.getBoundingClientRect()
    }
}

const $ = new Dom()

export {
    setStylesByObject,
    $
}