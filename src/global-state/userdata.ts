import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils'
import type { ApiSession } from '../requests/auth'


export const userDataSlice = createSlice({
    name: 'userdata',

    initialState: {
        username: getStorageItem('username') || '',
        apiSession: null as ApiSession | null,
    },

    reducers: {
        updateUsername: (state, { payload }: PayloadAction<string>) => {

            if (payload){
                setStorageItem('username', payload);
            } else {
                removeStorageItem('username');
            }
            
            state.username = payload;
        },

        updateApiSession: (state, { payload }: PayloadAction<ApiSession | null>) => {
            state.apiSession = null;
        }
    },
})


export const { updateUsername, updateApiSession } = userDataSlice.actions;

const userDataReducer = userDataSlice.reducer;
export default userDataReducer;