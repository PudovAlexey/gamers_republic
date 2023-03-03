import { createSlice } from "@reduxjs/toolkit"
import { EScrollDirection } from "../../../../api/types"

const initialState = {
    fireChange: false,
    fireScroll: false,
    currentSlide: 0,
    lastScrollTop: 0,
    scrollDirection: EScrollDirection.Draw,
    scrollContainerHeight: 0,
    scrollPosition: 0,
    slideToShow: 0,
    scrollSpeed: 1,
    slickRef: null,
    scrollRef: null,
    fanIds: [],
    fanData: {},
    fanControl: () => {}
}

const fanSlice = createSlice({
    name: 'fanSlice',
    initialState,
    reducers: {
      onInit: (state, action) => {
        const {fanIds, fanData, fanControl, slickRef, scrollRef} = action.payload
        state.fanIds = fanIds
        state.fanData = fanData
        state.fanControl = fanControl
        state.slickRef = slickRef
        state.scrollRef = scrollRef
      },
      setView: (state, action) => {
        if (action.payload) {
          const test = (state.fanIds.length * (action.payload.clientHeight)) / 2

          state.scrollContainerHeight = test
        }
      },
      onScroll: (state, action) => {
        function handleScrollTop() {
        var st = action.payload.target.scrollTop
        const scrollHeight = action.payload.target.scrollHeight
        state.scrollPosition = st / scrollHeight * 100
        let currentSlide = +((state.fanIds.length * (st / scrollHeight * 100) / 92.5) || 1).toFixed(0)
        if (currentSlide > state.fanIds.length) currentSlide = state.fanIds.length
        state.slideToShow = currentSlide
        state.slickRef.slickGoTo(currentSlide || 1)
        console.log(currentSlide, 'slide')

        if (st > state.lastScrollTop) {
          state.scrollDirection = EScrollDirection.Up
        } else if (st < state.lastScrollTop) {
          state.scrollDirection = EScrollDirection.Down
          // upscroll code
        } // else was horizontal scroll
        state.lastScrollTop = st <= 0 ? 0 : st;
        }
        handleScrollTop()
      },

      onSlideNavigate: (state) => {
        // state.slickRef.slickGoTo(state.slideToShow)
      },

      onFireChange: (state, action) => {
        state.fireChange = action.payload
      },

      onFireScroll: (state, action) => {
        state.fireScroll = action.payload
      },

      afterChange: (state, action) => {
        if (state.fireChange) return;
        const scrollHeight = state.scrollRef.scrollHeight + state.scrollRef.offsetHeight
        const delay = state.scrollDirection === EScrollDirection.Up ? +3 : -3
        state.scrollRef.scrollTop =  ((scrollHeight * (action.payload + delay)) / 115)
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
    afterChange,
    setView,
    onSlideNavigate,
    onFireScroll,
    onFireChange

} = fanSlice.actions

export default fanSlice.reducer