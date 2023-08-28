import { createSlice } from '@reduxjs/toolkit'
import { getCookie } from '../utils'

export const userDataSlice = createSlice({
    name: 'userdata',
    initialState: {
        username: getCookie('username') || '',
    },
    reducers: {
        updateUsername: (state) => {
            state.username = getCookie('username') || '';
        },
    },
})

export const { updateUsername } = userDataSlice.actions;

const userDataReducer = userDataSlice.reducer;
export default userDataReducer;