import { createSlice, current } from '@reduxjs/toolkit';

const initialState: {
  canvas: HTMLCanvasElement | null
  canvasContext: CanvasRenderingContext2D | null
  audioContext: AudioContext | null
  analyser: AnalyserNode | null
  dataArray: Uint8Array
  bufferLength: any | null
  width: number | null
  height: number | null
  play: boolean
} = {
  play: false,
  canvas: null,
  canvasContext: null,
  audioContext: null,
  analyser: null,
  dataArray: null,
  bufferLength: null,
  width: null,
  height: null
};


let heightScale;
const playAudioSlice = createSlice({
  name: 'playAudioSlice',
  initialState,
  reducers: {
    onInit: (state, action) => {
      const { canvas } = action.payload;
      state.canvas = canvas;
      state.width = canvas.width;
      state.height = canvas.height;
      state.canvasContext = canvas.getContext('2d');
    },
    onStartPlayMusic: (state, action) => {
      state.play = !state.play
      const width = state.width
      const height = state.height
      const audioContext = new window.AudioContext();
      const canvasContext = state.canvasContext
      const analyser = audioContext.createAnalyser();
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const { player } = action.payload;
      state.analyser = analyser;
      state.bufferLength = bufferLength;
      state.dataArray = dataArray
      analyser.fftSize = 512;
      state.audioContext = audioContext;
      player.play(0)
      player.childNodes[0].onplay = (e) => {
        state.audioContext.resume();
      };

      player.childNodes[0].addEventListener('play', () =>
        state.audioContext.resume()
      );

      var sourceNode = state.audioContext.createMediaElementSource(player);

      sourceNode.connect(analyser);
      state.analyser.connect(audioContext.destination);
      requestAnimationFrame(visualize);

      function visualize() {
        // очистить canvas
        canvasContext.clearRect(0, 0, width, height);
        
        // Или используйте заливку RGBA, чтобы получить небольшой эффект размытия
        //canvasContext.fillStyle = 'rgba (0, 0, 0, 0.5)';
        //canvasContext.fillRect(0, 0, width, height);
        
        // Получить данные анализатора
        analyser.getByteFrequencyData(dataArray);
      
         var barWidth = width / bufferLength;
            var barHeight;
            var x = 0;
         
            // значения изменяются от 0 до 256, а высота холста равна 100. Давайте изменим масштаб
            // перед отрисовкой. Это масштабный коэффициент
            heightScale = height/128;
        
            for(var i = 0; i < bufferLength; i++) {
              barHeight = dataArray[i];
      
      
              canvasContext.fillStyle = 'rgb(' + (barHeight+0) + ',4,160)';
              barHeight *= heightScale;
              canvasContext.fillRect(x, height-barHeight/2, barWidth, barHeight/2);
      
              // 2 - количество пикселей между столбцами
              x += barWidth + 2;
            }
        
        // вызовите снова функцию визуализации со скоростью 60 кадров / с
        requestAnimationFrame(visualize);
        
      }
        // очистить canvas
        canvasContext.clearRect(0, 0, width, height);
        
        // Или используйте заливку RGBA, чтобы получить небольшой эффект размытия
        //canvasContext.fillStyle = 'rgba (0, 0, 0, 0.5)';
        //canvasContext.fillRect(0, 0, width, height);
        
        // Получить данные анализатора
        analyser.getByteFrequencyData(dataArray);
      
         var barWidth = width / bufferLength;
            var barHeight;
            var x = 0;
         
            // значения изменяются от 0 до 256, а высота холста равна 100. Давайте изменим масштаб
            // перед отрисовкой. Это масштабный коэффициент
            heightScale = height/128;
        
            for(var i = 0; i < bufferLength; i++) {
              barHeight = dataArray[i];
      
      
              canvasContext.fillStyle = 'rgb(' + (barHeight+0) + ',4,160)';
              barHeight *= heightScale;
              canvasContext.fillRect(x, height-barHeight/2, barWidth, barHeight/2);
      
              // 2 - количество пикселей между столбцами
              x += barWidth + 2;
            }
    },
    onExit: (state) => {
      Object.keys(initialState).forEach((key) => {
        state[key] = null;
      });
    },
  },
});

export const { onInit, onStartPlayMusic, onExit } = playAudioSlice.actions;

export default playAudioSlice.reducer;
