import { configureStore } from '@reduxjs/toolkit'
import stepSlice from '../components/reusable/Wizard/store/stepSlice'
import partySlice from '../components/PartyComponent/store/index'
import messagesInfoSlice from '../components/PartyComponent/parts/Chat/store/messageInfoSlice'
import messagesSlice from '../components/PartyComponent/parts/Chat/store/messagesSlice'
import chatSlice from '../components/PartyComponent/parts/Chat/store/chatSlice'
import createSagaMiddleware from "redux-saga";
import { rootSaga } from './sagas'
import authSlice from './authSlice/authSlice'
import debugSlice from '../utils/enviroment/debugPanel/store'
import fanSlice from '../components/reusable/FanView/redux'
import { chatRedusers } from '../components/PartyComponent/parts/Chat/store/chatRedusers'

let sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        debug: debugSlice,
        authSlice: authSlice,
        wizardStep: stepSlice,
        partySlice: partySlice,
        messagesInfoSlice: messagesInfoSlice,
        messagesSlice: messagesSlice,
        chatSlice: chatSlice,
        chatRedusers: chatRedusers,
        fanSlice: fanSlice
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(
      {
         serializableCheck: false
      }), sagaMiddleware]
  })

  sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

  export default store