import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    scrollContainerHeight: 0,
    scrollSpeed: 50,
    slickRef: null,
    fanIds: [],
    fanData: {},
    fanControl: () => {}
}

const fanSlice = createSlice({
    name: 'fanSlice',
    initialState,
    reducers: {
      onInit: (state, action) => {
        const {fanIds, fanData, fanControl, slickRef} = action.payload
        state.fanIds = fanIds
        state.fanData = fanData
        state.fanControl = fanControl
        state.slickRef = slickRef
      },
      setView: (state, action) => {
        if (action.payload) {
          state.scrollContainerHeight = state.fanIds.length * action.payload.clientHeight
        }
      },
      onScroll: (state, action) => {
        
      },
      onExit: (state) => {
        state.fanIds = []
        state.fanData = {}
      },
    },
   
})

export const {
    onInit,
    onExit,
    onScroll,
    setView

} = fanSlice.actions

export default fanSlice.reducer