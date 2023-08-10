import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const userDataSlice = createSlice({
  name: 'userdata',
  initialState: {
    username: null as string | null,
  },
  reducers: {
    dispatchUsername: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload
    },
  },
})

export const { dispatchUsername } = userDataSlice.actions

const userDataReducer = userDataSlice.reducer
export default userDataReducer