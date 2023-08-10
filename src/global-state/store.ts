import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './userdata'

const store = configureStore({
  reducer: {
    userdata: userDataReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch