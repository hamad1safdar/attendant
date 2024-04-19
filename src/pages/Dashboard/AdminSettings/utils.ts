export const DEPARTMENTS = ['Engineering', 'Marketing'];
export const POSITIONS: { [x: string]: Array<string> } = {
    Engineering: ['Frontend Engineer', 'Backend Engineer'],
    Marketing: ['Manager', 'Lead'],
};
export const PREFIXES: { [x: string]: string } = {
    Engineering: 'SE',
    Marketing: 'M',
};

export const DEFAULT_PIN = '0000';

export const getUserDefaults = () => {
    return {
        isDefaultPassword: true,
        joiningDate: new Date().toDateString(),
        pin: DEFAULT_PIN,
        hoursWorked: 0,
        role: 'user',
    };
};
