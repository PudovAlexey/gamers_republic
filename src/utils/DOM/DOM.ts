function setStylesByObject(el, classes) {
    const stringClasses = Object.keys(classes)
    .reduce((str, key) => 
    str + `${key}: ${classes[key]};`, "")
    return el.style.cssText = stringClasses
}

class $ {
    $rect(el) {
     return el.getBoundingClientRect()
    }
}

export {
    setStylesByObject,
    $
}