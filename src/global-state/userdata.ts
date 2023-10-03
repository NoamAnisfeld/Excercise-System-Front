import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface StoredUserInfo {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    isStaff: boolean,    
}

const initialState: StoredUserInfo & {
    initialized: boolean
} = Object.freeze({
    initialized: false,
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    isStaff: false,
});


export const userDataSlice = createSlice({
    name: 'userinfo',

    initialState,

    reducers: {
        updateUserInfo: (state, { payload }: PayloadAction<StoredUserInfo>) => {
            Object.assign(state, payload);
            state.initialized = true;
        },

        resetUserInfo: (state) => {
            Object.assign(state, initialState);
        }
    },
})


export const { updateUserInfo, resetUserInfo } = userDataSlice.actions;

const userDataReducer = userDataSlice.reducer;
export default userDataReducer;