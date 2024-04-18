import { EmployeeId, User } from '../types';

export const addUser = (newUser: User, users: Array<User>): Array<User> => {
    return [...users, newUser];
};

export const deleteUser = (
    employeeId: EmployeeId,
    users: Array<User>
): Array<User> => {
    return users.filter((user) => user.emplyeeId !== employeeId);
};

export const updateUser = (
    employeeId: EmployeeId,
    updatedUserAttributes: Partial<User>,
    users: Array<User>
): Array<User> => {
    const index = users.findIndex((user) => user.emplyeeId === employeeId);
    if (index < 0) {
        return users;
    }

    return [
        { ...users[index], ...updatedUserAttributes },
        ...users.filter((user) => user.emplyeeId !== employeeId),
    ];
};
