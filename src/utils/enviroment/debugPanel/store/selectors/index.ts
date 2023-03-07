import { RootState } from "@/store/store"

const toggleDebugSelector = (store: RootState) => store.debug.toggleDebug

const debugComponentSelector = (store: RootState) => store.debug.debugComponent

export {
    toggleDebugSelector,
    debugComponentSelector
}