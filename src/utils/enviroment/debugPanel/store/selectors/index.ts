const toggleDebugSelector = store => store.debug.toggleDebug

const debugComponentSelector = store => store.debug.debugComponent

export {
    toggleDebugSelector,
    debugComponentSelector
}