import { configureStore } from '@reduxjs/toolkit'
import stepSlice from '../components/reusable/Wizard/store/stepSlice'
import partySlice from '../components/PartyComponent/store/index'
import playAudioSlice from '../components/PartyComponent/parts/Chat/components/AudioViewer/store/playAudioSlice'
import messagesInfoSlice from '../components/PartyComponent/parts/ChatUpdate/store/messageInfoSlice'
import messagesSlice from '../components/PartyComponent/parts/ChatUpdate/store/messagesSlice'
import chatSlice from '../components/PartyComponent/parts/ChatUpdate/store/chatSlice'

const store = configureStore({
    reducer: {
        wizardStep: stepSlice,
        partySlice: partySlice,
        playAudioSlice: playAudioSlice,
        messagesInfoSlice: messagesInfoSlice,
        messagesSlice: messagesSlice,
        chatSlice: chatSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

  export default store