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
        setCurrentUser(state, action: PayloadAction<User>) {
            state.currentUser = action.payload;
        },
        //
        punchIn(state, action: PayloadAction<AttendanceRecord>) {
            state.currentUser?.record.unshift(action.payload);
            state.users = replaceUser(state.currentUser!, state.users);
        },
        punchOut(state, action: PayloadAction<AttendanceRecord['punchOut']>) {
            state.currentUser!.record[0].punchOut = action.payload;
            state.users = replaceUser(state.currentUser!, state.users);
        },
        requestLeave(state, action: PayloadAction<AttendanceRecord>) {
            state.currentUser?.record.unshift(action.payload);
            state.users = replaceUser(state.currentUser!, state.users);
        },
        //
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
    addUser,
    setCurrentUser,
} = slice.actions;
export default slice.reducer;

const replaceUser = (user: User, users: Array<User>) => {
    const index = users.findIndex((u) => u.emplyeeId === user.emplyeeId);
    if (index < 0) {
        return users;
    } else {
        return [...users.slice(0, index), user, ...users.slice(index + 1)];
    }
};
