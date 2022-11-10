import { configureStore } from '@reduxjs/toolkit'
import stepSlice from '../components/reusable/Wizard/store/stepSlice'

export default configureStore({
    reducer: {
        wizardStep: stepSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),
  })