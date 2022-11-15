import { configureStore } from '@reduxjs/toolkit'
import stepSlice from '../components/reusable/Wizard/store/stepSlice'

const store = configureStore({
    reducer: {
        wizardStep: stepSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),
  })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

  export default store