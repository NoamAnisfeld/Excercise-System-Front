import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface StoredUserInfo {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    isStaff: boolean,
}
type LoginStatus = 'uninitialized' | 'loggedIn' | 'loggedOut'
type StoredUserInfoWithLoginStatus = StoredUserInfo & {
    loginStatus: LoginStatus
}

const initialState: StoredUserInfoWithLoginStatus = Object.freeze({
    loginStatus: 'uninitialized',
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
        logUserIn: (state, { payload }: PayloadAction<StoredUserInfo>) => {
            Object.assign(state, payload);
            state.loginStatus = 'loggedIn';
        },

        logUserOut: (state) => {
            Object.assign(state, initialState);
            state.loginStatus = 'loggedOut';
        },
    },
})


export const { logUserIn, logUserOut } = userDataSlice.actions;

const userDataReducer = userDataSlice.reducer;
export default userDataReducer;