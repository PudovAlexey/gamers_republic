import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  canvas: null,
  canvasContext: null,
  audioContext: null,
  analyser: null,
  dataArray: null,
  bufferLength: null,
};

const playAudioSlice = createSlice({
  name: 'playAudioSlice',
  initialState,
  reducers: {
    onInit: (state, action) => {
      const { canvas } = action.payload;
      const audioContext = new window.AudioContext();
      const analyser = audioContext.createAnalyser();
      const bufferLength = analyser.frequencyBinCount;
      analyser.fftSize = 512;
      state.canvas = canvas;
      state.canvasContext = canvas.getContext('2d');
      state.audioContext = audioContext;
      state.analyser = analyser;
      state.bufferLength = bufferLength;
      state.dataArray = new Uint8Array(bufferLength);
    },
    onStartPlayMusic: (state, action) => {
      const { player } = action.payload;
      player.childNodes[1].onplay = (e) => {
        state.audioContext.resume();
      };

      player.childNodes[1].addEventListener('play', () =>
        state.audioContext.resume()
      );

      var sourceNode = state.audioContext.createMediaElementSource(player);

      sourceNode.connect(state.analyser);
      state.analyser.connect(state.audioContext.destination);
    },
    onExit: (state) => {
      Object.keys(initialState).forEach((key) => {
        state[key] = null;
      });
    },
  },
});

export const { onInit, onStartPlayMusic, onExit } = playAudioSlice.actions;

export default playAudioSlice;
