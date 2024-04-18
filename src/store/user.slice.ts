import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import * as userService from '../services/users';
import type { EmployeeId, User, UpdateUserPayload } from '../types';

const initialState: Array<User> = [];

const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(_state, action: PayloadAction<Array<User>>) {
            return action.payload;
        },
        deleteUser(state, action: PayloadAction<EmployeeId>) {
            return userService.deleteUser(action.payload, state);
        },
        updateUser(state, action: PayloadAction<UpdateUserPayload>) {
            let foundUser = state.find(
                (employee) => employee.emplyeeId === action.payload.employeeId
            );
            if (foundUser) {
                foundUser = action.payload.updatedUser;
            }
        },
        addUser(state, action: PayloadAction<User>) {
            return userService.addUser(action.payload, state);
        },
    },
});

export const { setUsers, deleteUser, updateUser } = slice.actions;
export default slice.reducer;
