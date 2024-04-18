import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
            state = state.filter(
                (employee) => employee.emplyeeId != action.payload
            );
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
            state.push(action.payload);
        },
    },
});

export const { setUsers, deleteUser, updateUser } = slice.actions;
export default slice.reducer;
