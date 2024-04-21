import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import * as userService from '../services/users';
import type {
    EmployeeId,
    User,
    UpdateUserPayload,
    UserState,
    AttendanceRecord,
} from '../types';

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
        punchIn(state, action: PayloadAction<AttendanceRecord>) {
            state.currentUser?.record.unshift(action.payload);
        },
        punchOut(state, action: PayloadAction<AttendanceRecord['punchOut']>) {
            state.currentUser!.record[0].punchOut = action.payload;
        },
        requestLeave(state, action: PayloadAction<AttendanceRecord>) {
            state.currentUser?.record.unshift(action.payload);
        },
        setUsers(state, action: PayloadAction<Array<User>>) {
            state.currentUser = action.payload.find(
                (user) => user.emplyeeId === state.currentUser?.emplyeeId
            )!;
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

export const {
    setUsers,
    deleteUser,
    updateUser,
    login,
    logout,
    punchIn,
    punchOut,
    requestLeave,
} = slice.actions;
export default slice.reducer;
