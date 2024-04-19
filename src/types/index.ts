export interface LoginCredentials {
    employeeId: EmployeeId;
    pin: string;
}

export interface AuthState {
    loggedIn: boolean;
    role: string | null;
    employeeId: string | null;
    lastName: string;
    firstName: string;
    isDefaultPassword: boolean;
}

export interface User {
    emplyeeId: EmployeeId;
    firstName: string;
    lastName: string;
    email: string;
    pin: string;
    role: string;
    department: string;
    position: string;
    hoursWorked: number;
    joiningDate: string;
    isDefaultPassword: boolean;
}

export type EmployeeId = string;

export interface UpdateUserPayload {
    employeeId: EmployeeId;
    updatedUser: User;
}

export interface AuthResult {
    success: boolean;
    message: string;
    loggedInUser?: AuthState | null;
}

export interface Gist {
    description?: string;
    files: GistFile;
}

export interface GistFile {
    [x: string]: GistContent;
}

export interface GistContent {
    content: string;
}

export interface HelperData {
    lastKey: {
        Engineering: string;
        Marketing: string;
    };
    departments: {
        Engineering: string;
        Marketing: string;
    };
    positions: {
        Engineering: Array<string>;
        Marketing: Array<string>;
    };
}

export interface UserState {
    currentUser: User | null;
    users: Array<User>;
}
