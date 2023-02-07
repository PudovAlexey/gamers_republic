import { createSlice } from "@reduxjs/toolkit"
import { EScrollDirection } from "../../../../api/types"

const initialState = {
    fireChange: false,
    fireScroll: false,
    currentSlide: 0,
    lastScrollTop: 0,
    scrollDirection: EScrollDirection.Draw,
    scrollContainerHeight: 0,
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
          const test = (state.fanIds.length * (action.payload.clientHeight) * (16)) / 2
          state.scrollContainerHeight = test
        }
      },
      onScroll: (state, action) => {
        function handleScrollTop() {
          const {target} = action.payload
     //   state.scrollSpeed =  (Math.abs(checkScrollSpeed())) / 1000
        var st = action.payload.target.scrollTop
        console.log(st, 'scroll')
        console.log(state.lastScrollTop, 'lastScroll')
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

      onNext: (state) => {
        if (state.fireScroll) return
        state.slickRef.slickNext()
      },

      onFireChange: (state, action) => {
        state.fireChange = action.payload
      },

      onFireScroll: (state, action) => {
        state.fireScroll = action.payload
      },

      onPrev: (state) => {
        if (state.fireScroll) return
        state.slickRef.slickPrev()
      },

      afterChange: (state, action) => {
        console.log(state.fireChange)
        if (state.fireChange) return
        state.scrollRef.scrollTop = (state.scrollRef.scrollHeight / state.fanIds.length) * action.payload
        state.currentSlide = action.payload
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
    onNext,
    onPrev,
    onFireScroll,
    onFireChange

} = fanSlice.actions

export default fanSlice.reducer

const checkScrollSpeed = (function(settings){
  settings = settings || {};

  let lastPos, newPos, timer, delta, 
      delay = settings.delay || 50;

  function clear() {
      lastPos = null;
      delta = 0;
  }

  clear();

  return function(){
      newPos = document.querySelector('.css-lm4r9v').scrollTop;
      if ( lastPos != null ){ // && newPos < maxScroll 
          delta = newPos -  lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
  };
})();