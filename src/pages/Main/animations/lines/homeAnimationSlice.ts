import { createSlice } from '@reduxjs/toolkit';
import { eventConfig } from './config';
const fullProgress = 2000;
const fullProgressStart = 500;
const titleFullProgress = 100;

const initialState = {
  fullProgressLine: fullProgress,
  fullProgressStartLine: fullProgressStart,
  uploadCompleted: false,
  progressGameLine: fullProgress,
  progressGameStartLine: fullProgress,
  progressFeatureLine: fullProgress,
  progressFeatureStartLine: fullProgress,
  progressWhatsNew: fullProgress,
  progressWhatsNewStart: fullProgress,
  progressAbout: fullProgress,
  progressStartAbout: fullProgress,
  gameTitleProgress: titleFullProgress,
  featuresTitleProgress: titleFullProgress,
  WhatsNewTitleProgress: titleFullProgress,
  aboutTitleProgress: titleFullProgress,
  gamesStartLine: null,
  featuresStartLine: null,
  whatsNewStartLine: null,
  aboutStartLine: null,
  gamesRef: null,
  featuresRef: null,
  whatsNewRef: null,
  aboutRef: null,
};

const homeAnimationSlice = createSlice({
  name: 'homeAnimationSlice',
  initialState,
  reducers: {
    setRef: (
      state,
      action: {
        payload: {
          type: string;
          ref: HTMLElement;
        };
      }
    ) => {
      const { type, ref } = action.payload;
      state[type] = ref;
    },

    onChangeGameCoords: (state, action) => {
      const { self, type } = action.payload;
      const progress = self.progress * 100;
      const { startLine, title, mainLine, previousBlock } = eventConfig[type];
      // const previous = eventConfig[previousBlock]
      // if (state[previous?.mainLine] == fullProgress) {
      //   console.log('start new block')
      // } 
      if (progress < 10) {
        state[startLine] = fullProgressStart;
        state[title] = titleFullProgress;
        state[mainLine] = fullProgress;
        return;
      }
      if (progress < 5) {
        const calculate =
          fullProgressStart - (fullProgressStart * progress) / 10;
        state[startLine] = calculate <= 0 ? 0 : calculate;
      } else {
        state[startLine] = 0;
      }
      if (state[startLine] === 0) {
        const calculate = 100 - progress * self.progress * 10;
        state[title] = calculate <= 0 ? 0 : calculate;
      } else {
        state[title] = 0;
      }
      if (state[title] === 0) {
        const calculate = fullProgress - (fullProgress * progress) / 90 + 500;
        state[mainLine] = calculate <= 0 ? 0 : calculate;
      }
    },

    setStartLine: (
      state,
      action: {
        payload: {
          ref: any;
          type: string;
        };
      }
    ) => {
      const { ref, type } = action.payload;
      state[type] = ref;
    },

    onExit: (store) => {},
  },
  extraReducers: (builder) => {},
});

export const { setRef, onExit, onChangeGameCoords, setStartLine } =
  homeAnimationSlice.actions;

export default homeAnimationSlice.reducer;
