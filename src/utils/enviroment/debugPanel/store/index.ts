import { createSlice } from '@reduxjs/toolkit';
const initialState: {
    toggleDebug: boolean,
    debugComponent: JSX.Element | null
} = {
    toggleDebug: false,
    debugComponent: null
}

const debugSlice = createSlice({
    name: 'debugSlice',
    initialState,
    reducers: {
        onInit: (state, action) => {
            state.debugComponent = action.payload
        },
        toggleDebug: (state) => {
            state.toggleDebug = !state.toggleDebug
        },
        onExit: (state) => {
            state.debugComponent = null
            state.toggleDebug = false
        }
    }
})

export const {
    toggleDebug,
    onInit,
    onExit
} = debugSlice.actions

export default debugSlice.reducer