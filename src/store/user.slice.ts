import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { EmployeeId, User, UserState } from '../types';

const initialState: UserState = {
    currentUser: null,
    users: [],
};

const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login(state, action: PayloadAction<EmployeeId>) {
            const index = state.users.findIndex(
                (user) => user.emplyeeId === action.payload
            );
            state.currentUser = index >= 0 ? state.users[index] : null;
        },
        logout(state) {
            state.currentUser = null;
        },
        setCurrentUser(state, action: PayloadAction<User>) {
            state.currentUser = action.payload;
        },
    },
});

export const { login, logout, setCurrentUser } = slice.actions;
export default slice.reducer;
