import { configureStore } from '@reduxjs/toolkit'
import stepSlice from '../components/reusable/Wizard/store/stepSlice'
import partySlice from '../components/PartyComponent/store/index'
import messagesInfoSlice from '../components/PartyComponent/parts/Chat/store/messageInfoSlice'
import messagesSlice from '../components/PartyComponent/parts/Chat/store/messagesSlice'
import chatSlice from '../components/PartyComponent/parts/Chat/store/chatSlice'
import createSagaMiddleware from "redux-saga";
import { rootSaga } from './sagas'
import authSlice from './authSlice/authSlice'

let sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        authSlice: authSlice,
        wizardStep: stepSlice,
        partySlice: partySlice,
        messagesInfoSlice: messagesInfoSlice,
        messagesSlice: messagesSlice,
        chatSlice: chatSlice
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false
    //   }),
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(
      {
        //  thunk: false,
         serializableCheck: false
      }), sagaMiddleware]
  })

  sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

  export default store