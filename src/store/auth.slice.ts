import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../types';

const initialState: AuthState = {
    loggedIn: false,
    role: null,
    employeeId: null,
    firstName: '',
    lastName: '',
    isDefaultPassword: false,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<AuthState>) {
            state = action.payload;
        },
        logout(state) {
            state = initialState;
        },
        loginAsAdmin(state, action: PayloadAction<AuthState>) {
            state = action.payload;
        },
    },
});

export const { login, loginAsAdmin, logout } = slice.actions;
export default slice.reducer;
