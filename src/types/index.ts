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
    record: Array<AttendanceRecord>;
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

export interface UserState {
    currentUser: User | null;
    users: Array<User>;
}

export interface AttendanceRecord {
    date: string;
    status: 'absent' | 'leave' | 'present';
    punchIn: string | null;
    punchOut: string | null;
}

export interface HelperState {
    isLoading: IsLoading;
    alert: AlertState;
}

export interface AlertState {
    show: boolean;
    message: string;
    type: Severity;
}

export type Severity = 'error' | 'info' | 'success' | 'warning';

export type IsLoading = boolean;
