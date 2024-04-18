import type { AuthResult, EmployeeId, LoginCredentials, User } from '../types';

export const authenticate = (
    creds: LoginCredentials,
    users: Array<User>
): AuthResult => {
    const { employeeId, pin } = creds;
    const foundUser = users.find((user) => user.emplyeeId === employeeId);
    const result: AuthResult = {
        success: false,
        message: '',
    };
    if (foundUser) {
        if (pin === foundUser.pin) {
            result.success = true;
            result.message = 'LOGGED_IN';
            result.loggedInUser = {
                employeeId: foundUser.emplyeeId,
                role: foundUser.role,
                loggedIn: true,
                lastName: foundUser.lastName,
                firstName: foundUser.firstName,
                isDefaultPassword: foundUser.isDefaultPassword,
            };
        } else {
            result.success = false;
            result.message = 'INVALID_PIN';
        }
    } else {
        (result.success = false), (result.message = 'INVALID_ID');
    }

    return result;
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
