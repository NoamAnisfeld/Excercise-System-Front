import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userDataReducer from './userdata'

const rootReducer = combineReducers({
  userdata: userDataReducer,
})

function setupStore() {
  return configureStore({
    reducer: rootReducer,
  })
}

export default setupStore
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
