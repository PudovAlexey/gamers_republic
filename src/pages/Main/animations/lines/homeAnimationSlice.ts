import { createSlice } from '@reduxjs/toolkit';
const fullProgress = 2000;
const titleFullProgress = 100;

const initialState = {
  uploadCompleted: false,
  progressGameLine: fullProgress,
  progressFeatureLine: fullProgress,
  progressWhatsNew: fullProgress,
  progressAbout: fullProgress,
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
      const containerPosition = (fullProgress * (self.progress * 100)) / 100;
      const calculate = fullProgress - containerPosition + 300;
      state[titleType] = 100 - self.progress * 100 + 10;
      state[type] = calculate;
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