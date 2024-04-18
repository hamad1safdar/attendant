import { useState, ChangeEvent } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { useAppSelector } from '../../store';
import { updateUsers as updateUsersGist } from '../../services/gists';

import { addUser } from '../../services/users';
import { generateEmployeeID, getLastEntryByNumber } from '../../helper';
import { DEPARTMENTS, POSITIONS, PREFIXES, getUserDefaults } from './utils';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    department: DEPARTMENTS[0],
    position: POSITIONS[DEPARTMENTS[0]][0],
};

export default function useAddUser() {
    const [values, setValues] = useState(initialState);
    const users = useAppSelector((state) => state.users);
    const queryClient = useQueryClient();

    const { mutate: syncWithGist, isPending } = useMutation({
        mutationFn: updateUsersGist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gists/users'] });
            setValues(initialState);
        },
        onError: () => {
            alert('Something went wrong!');
        },
    });

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
            alert('Please complete the add user form before submitting!');
            return;
        }
        const lastKey = getLastEntryByNumber(
            users,
            PREFIXES[values.department]
        );
        const newKey = generateEmployeeID(lastKey);
        const newUsers = addUser(
            {
                ...values,
                emplyeeId: newKey,
                ...getUserDefaults(),
            },
            users
        );
        syncWithGist(newUsers);
    };

    return {
        values,
        handleInputChange,
        handleSaveClick,
        handleSelectChange,
        isAdding: isPending,
    };
}
