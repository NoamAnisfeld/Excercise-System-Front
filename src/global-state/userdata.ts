import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface StoredUserInfo {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    isStaff: boolean,    
}

const initialState: StoredUserInfo & {
    initialized: boolean,
    requiresLogin: boolean
} = Object.freeze({
    initialized: false,
    requiresLogin: false, // because we first try to resume the session
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
            state.requiresLogin = false;
        },

        resetUserInfo: (state) => {
            Object.assign(state, initialState);
            state.requiresLogin = true;
        },

        requireLogin: (state) => {
            state.requiresLogin = true;
        }
    },
})


export const { updateUserInfo, resetUserInfo, requireLogin } = userDataSlice.actions;

const userDataReducer = userDataSlice.reducer;
export default userDataReducer;