import { createSlice, current } from '@reduxjs/toolkit';

function onStopHandler() {
  let onStop = true
  return {
    changeStop: (change) => {
      return onStop = change
    },
    getStop: () => {
      return onStop
    }
  }
}

const onStop = onStopHandler()

const initialState: {
  canvas: HTMLCanvasElement | null
  audioControls: Record<string, {
    play: boolean,
    context: CanvasRenderingContext2D
  }>
  audioContext: AudioContext | null
  analyser: AnalyserNode | null
  dataArray: Uint8Array
  contextCreated: boolean
  sourseNode: AudioBufferSourceNode
  bufferLength: any | null
  width: number | null
  height: number | null
} = {
  contextCreated: false,
  canvas: null,
  audioControls: {},
  audioContext: null,
  sourseNode: null,
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
      const { canvas, playerId } = action.payload;
      state.canvas = canvas;
      state.width = canvas.width;
      state.height = canvas.height;
      let audioControls = state.audioControls
      if (!audioControls) {
        audioControls = {}
      } else {
        audioControls = current(state.audioControls)
      }
      
      state.audioControls = {
        ...audioControls,
        [playerId]: {
          play: false,
          context: canvas.getContext('2d')
        }
      }
    },
    onStartPlayMusic: (state, action) => {
    
      const { player, playerId } = action.payload;
      state.play = !state.play
      const width = state.width
      const height = state.height
      let audioContext
      let analyser
      let sourseNode = state.sourseNode
      const audioControls = current(state.audioControls)
      const currentControl = audioControls[playerId]
      state.audioControls = {
        ...audioControls,
        [playerId]: {
          ...audioControls[playerId],
          play: !currentControl.play
        }
      }
     
      if (!state.contextCreated) {
        audioContext = new window.AudioContext();
         state.audioContext = audioContext
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        state.audioContext = audioContext;
        state.play = !state.play
         player.childNodes[0].onplay = (e) => {
           state.audioContext.resume();
         };
   
         player.childNodes[0].addEventListener('play', () =>
           state.audioContext.resume()
           );
           
           try {
            sourseNode = audioContext.createMediaElementSource(player);
            state.sourseNode = sourseNode
          } catch(err) {
            console.log(err)
          }
          
          state.contextCreated = true
        } else {
          analyser = state.analyser
          audioContext = state.audioContext
          sourseNode = state.sourseNode
        }
        if (currentControl.play) {
          onStop.changeStop(false)
          // const audioContext = state.audioContext
          //  sourseNode.disconnect(analyser)
          // analyser.disconnect(audioContext.destination)
          // state.analyser = null
          // state.sourseNode = null
          // state.audioContext = null
          // state.contextCreated = false
          player.pause(0)
          return
        } else {
          onStop.changeStop(true)
          player.play(0)
        }
        sourseNode.connect(analyser);
        analyser.connect(audioContext.destination);
        requestAnimationFrame(() => visualize(playerId));
        const bufferLength = analyser.frequencyBinCount;
        state.analyser = analyser;
        state.bufferLength = bufferLength;
      const dataArray = new Uint8Array(bufferLength);
      state.dataArray = dataArray

      function visualize(playerId) {
        let isStop = onStop.getStop()

        audioControls[playerId].context.clearRect(0, 0, width, height);
 
        analyser.getByteFrequencyData(dataArray);
      
         var barWidth = width / bufferLength;
            var barHeight;
            var x = 0;
         
            heightScale = height/128;
        
            for(var i = 0; i < bufferLength; i++) {
              barHeight = dataArray[i];
      
      
              audioControls[playerId].context.fillStyle = 'rgb(' + (barHeight+0) + ',4,160)';
              barHeight *= heightScale;
              audioControls[playerId].context.fillRect(x, height-barHeight/2, barWidth, barHeight/2);
      
              x += barWidth + 2;
            }
        
        if (isStop) {
          requestAnimationFrame(() => visualize(playerId));

        } else {
              audioControls[playerId].context.clearRect(0, 0, width, height);
        }
        
      }
    
        audioControls[playerId].context.clearRect(0, 0, width, height);
        
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
      
      
              audioControls[playerId].context.fillStyle = 'rgb(' + (barHeight+0) + ',4,160)';
              barHeight *= heightScale;
              audioControls[playerId].context.fillRect(x, height-barHeight/2, barWidth, barHeight/2);
      
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
