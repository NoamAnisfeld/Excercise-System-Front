import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils'


export const userDataSlice = createSlice({
    name: 'userdata',

    initialState: {
        username: getStorageItem('username') || '',
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
    },
})


export const { updateUsername } = userDataSlice.actions;

const userDataReducer = userDataSlice.reducer;
export default userDataReducer;