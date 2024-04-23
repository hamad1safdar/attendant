import { useState, ChangeEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material';

import useAlert from '../../../hooks/useAlert';

import { generateEmployeeID, getLastEntryByNumber } from '../../../helper';
import { DEPARTMENTS, POSITIONS, PREFIXES, getUserDefaults } from './utils';
import useApp from '../../../hooks/useApp';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    department: DEPARTMENTS[0],
    position: POSITIONS[DEPARTMENTS[0]][0],
};

export default function useAddUser() {
    const [values, setValues] = useState(initialState);
    // const { users } = useAppSelector((state) => state.users);
    const { users, addUser: addUsersToGist } = useApp();
    const showAlert = useAlert();

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        if (name === 'department') {
            setValues((prev) => ({
                ...prev,
                department: value,
                position: POSITIONS[value][0],
            }));
            return;
        }
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = () => {
        if (!Object.values(values).every((v) => v)) {
            showAlert(
                'Please complete the add user form before submitting!',
                'error'
            );
            return;
        }
        const lastKey = getLastEntryByNumber(
            users!,
            PREFIXES[values.department]
        );
        const newKey = generateEmployeeID(lastKey);
        addUsersToGist({ emplyeeId: newKey, ...values, ...getUserDefaults() });
    };

    return {
        values,
        handleInputChange,
        handleSaveClick,
        handleSelectChange,
    };
}
