import { User } from './types';

export const generateEmployeeID = (lastKey: string) => {
    let [dept, key] = lastKey.split('-');
    let newKey = parseInt(key) + 1 + '';
    while (newKey.length < 3) {
        newKey = '0' + newKey + '';
    }
    return dept + '-' + newKey;
};

export const getLastEntryByNumber = (
    array: Array<User>,
    deptPrefix: string
): string => {
    const capitalizedPrefix = deptPrefix.toUpperCase();

    const filteredArray = array.filter((user) =>
        user.emplyeeId.startsWith(deptPrefix)
    );

    if (filteredArray.length === 0) {
        return `${capitalizedPrefix}-000`;
    }

    filteredArray.sort((userA, userB) => {
        const numA = parseInt(userA.emplyeeId.split('-')[1]);
        const numB = parseInt(userB.emplyeeId.split('-')[1]);
        return numA - numB;
    });

    return filteredArray[filteredArray.length - 1].emplyeeId;
};
