import { createSlice } from "@reduxjs/toolkit"
import { EScrollDirection } from "../../../../api/types"
const initialState = {
    lastScrollTop: 0,
    scrollDirection: EScrollDirection.Draw,
    scrollContainerHeight: 0,
    scrollSpeed: 100,
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
          state.scrollContainerHeight = (state.fanIds.length * (action.payload.clientHeight) * (16)) / 2
        }
      },
      onScroll: (state, action) => {
        function handleScrollTop() {
          const {target} = action.payload
     //   state.scrollSpeed =  (Math.abs(checkScrollSpeed())) / 1000
        var st = action.payload.target.scrollTop
        
        if (st > state.lastScrollTop) {
          state.slickRef.slickNext()
        } else if (st < state.lastScrollTop) {
          state.slickRef.slickPrev()
          // upscroll code
        } // else was horizontal scroll
        state.lastScrollTop = st <= 0 ? 0 : st;
        }
        handleScrollTop()

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