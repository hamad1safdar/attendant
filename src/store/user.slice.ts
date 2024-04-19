import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import * as userService from '../services/users';
import type { EmployeeId, User, UpdateUserPayload, UserState } from '../types';

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
        setUsers(state, action: PayloadAction<Array<User>>) {
            state.users = action.payload;
        },
        deleteUser(state, action: PayloadAction<EmployeeId>) {
            state.users = userService.deleteUser(action.payload, state.users);
        },
        updateUser(state, action: PayloadAction<UpdateUserPayload>) {
            let foundUser = state.users.find(
                (employee) => employee.emplyeeId === action.payload.employeeId
            );
            if (foundUser) {
                foundUser = action.payload.updatedUser;
            }
        },
        addUser(state, action: PayloadAction<User>) {
            state.users = userService.addUser(action.payload, state.users);
        },
    },
});

export const { setUsers, deleteUser, updateUser, login, logout } =
    slice.actions;
export default slice.reducer;
