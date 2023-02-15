import { createSlice } from '@reduxjs/toolkit';
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
      const { type, self, titleType } = action.payload;
      const progress = self.progress * 100
      if (type !== 'progressGameLine') {
        return;
      }
      console.log(progress)
      if ( progress > 0 && progress < 10) {
        const calculate = fullProgressStart - (fullProgressStart * progress / 10)
        state.progressGameStartLine = calculate
      } else if (progress > 11 && progress < 20) {
        state.gameTitleProgress = titleFullProgress - (titleFullProgress * progress / 19)
      } else {
        state.progressGameLine = fullProgress - (fullProgress * progress / 120)
      }
      // const containerPosition = (fullProgress * (self.progress * 100)) / 100;
      // const calculate = fullProgress - containerPosition + 300;
      // state[titleType] = 100 - self.progress * 100 + 10;
      // state[type] = calculate;
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

export const { 
  setRef, 
  onExit, 
  onChangeGameCoords,
  setStartLine
} =
  homeAnimationSlice.actions;

export default homeAnimationSlice.reducer;
