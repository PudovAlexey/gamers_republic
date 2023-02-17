import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { eventConfig } from './config';
import {
  fullProgress,
  fullProgressStart,
  resetStoreAfterPercentage,
  startCalculationAnimation,
  titleFullProgress,
} from './constants';

const initialState = {
  fullProgressLine: fullProgress,
  fullProgressStartLine: fullProgressStart,
  uploadCompleted: false,
  // GAME SECTION
  progressGameLine: fullProgress,
  progressGameStartLine: fullProgress,
  gamesStartLine: null,
  gameTitleProgress: titleFullProgress,
  gamesRef: null,
  //
  // FEATURES SECTION
  progressFeatureLine: fullProgress,
  progressFeatureStartLine: fullProgressStart,
  featuresTitleProgress: titleFullProgress,
  featuresStartLine: null,
  featuresRef: null,

  //
  // WHATS NEW SECTION
  progressWhatsNew: fullProgress,
  progressWhatsNewStart: fullProgressStart,
  WhatsNewTitleProgress: titleFullProgress,
  whatsNewStartLine: null,
  whatsNewRef: null,

  //
  // ABOUT SECTION
  progressAbout: fullProgress,
  progressStartAbout: fullProgressStart,
  aboutTitleProgress: titleFullProgress,
  aboutStartLine: null,
  aboutRef: null,
  //
};

const homeAnimationSlice = createSlice({
  name: 'homeAnimationSlice',
  initialState,
  reducers: {
    setRef: (
      state,
      action: PayloadAction<{
        type: string;
        ref: HTMLElement;
      }>
    ) => {
      const { type, ref } = action.payload;
      state[type] = ref;
    },

    animationTrigger: (state, action) => {
      const { self, type } = action.payload;
      const progress = self.progress * 100;
      const { startLine, title, mainLine } = eventConfig[type];

      if (progress < resetStoreAfterPercentage) {
        state[startLine] = fullProgressStart;
        state[title] = titleFullProgress;
        state[mainLine] = fullProgress;
        return;
      }
      if (progress < startCalculationAnimation) {
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
        const calculate = fullProgress - (fullProgress * progress) / 90 + 300;
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

export const { setRef, onExit, animationTrigger, setStartLine } =
  homeAnimationSlice.actions;

export default homeAnimationSlice.reducer;
