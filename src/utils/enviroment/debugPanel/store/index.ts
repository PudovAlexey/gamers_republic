import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: {
  toggleDebug: boolean;
  debugComponent: React.ReactNode | null;
} = {
  toggleDebug: false,
  debugComponent: null,
};

const debugSlice = createSlice({
  name: 'debugSlice',
  initialState,
  reducers: {
    onInit: (state, action: PayloadAction<React.ReactNode>) => {
      state.debugComponent = action.payload;
    },
    toggleDebug: (state) => {
      state.toggleDebug = !state.toggleDebug;
    },
    onExit: (state) => {
      state.debugComponent = null;
      state.toggleDebug = false;
    },
  },
});

export const { toggleDebug, onInit, onExit } = debugSlice.actions;

export default debugSlice.reducer;
