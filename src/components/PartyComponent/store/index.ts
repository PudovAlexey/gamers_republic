import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    activeContainer: null,
}

const partySlice = createSlice({
    name: 'partySlice',
    initialState,
    reducers: {
        setContainer(store, action) {
            console.log(action.payload, 'store')
            store.activeContainer = action.payload
        }
    }
})

export const {
    setContainer
} = partySlice.actions

export default partySlice.reducer