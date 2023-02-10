import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createSlice } from '@reduxjs/toolkit';
const fullProgress = 2000;

gsap.registerPlugin(ScrollTrigger);

const initialState = {
  uploadCompleted: false,
  progressGameLine: fullProgress,
  progressFeatureLine: fullProgress,
  progressWhatsNew: fullProgress,
  progressAbout: fullProgress,
  gameTitleProgress: 100,
  featuresTitleProgress: 100,
  WhatsNewTitleProgress: 100,
  aboutTitleProgress: 100,
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
      const calculate = fullProgress - containerPosition - 50;
      state[titleType] = 100 - self.progress * 100 + 10;
      state[type] = calculate;
    },

    onExit: (store) => {},
  },
  extraReducers: (builder) => {},
});

export const { setRef, onExit, onChangeGameCoords } =
  homeAnimationSlice.actions;

export default homeAnimationSlice.reducer;
