import { createSlice, PayloadAction } from '@reduxjs/toolkit'

function getStorageItem(key: string): ReturnType<typeof localStorage.getItem> {
    return localStorage.getItem(
        (import.meta.env.VITE_STORAGE_PREFIX || '') + key,
    );
}

function setStorageItem(key: string, value: string): ReturnType<typeof localStorage.setItem> {
    const actualKey = (import.meta.env.VITE_STORAGE_PREFIX || '') + key;
    
    if (value) {
        localStorage.setItem(actualKey, value);
    } else {
        localStorage.removeItem(actualKey);
    }
}

export const userDataSlice = createSlice({
    name: 'userdata',
    initialState: {
        username: getStorageItem('username') || '',
    },
    reducers: {
        updateUsername: (state, { payload }: PayloadAction<string>) => {
            setStorageItem('username', payload);
            state.username = payload;
        },
    },
})

export const { updateUsername } = userDataSlice.actions;

const userDataReducer = userDataSlice.reducer;
export default userDataReducer;