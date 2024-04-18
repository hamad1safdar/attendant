import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppSelector } from '../../store';
import { authenticate } from '../../services/auth';
import { updateUsers as updateUsersOnGist } from '../../services/gists';
import { updateUser as updateUserById } from '../../services/auth';
import type {
    AuthResult,
    EmployeeId,
    LoginCredentials,
    User,
} from '../../types';

const useAuth = () => {
    const users = useAppSelector((state) => state.users);
    const queryClient = useQueryClient();
    const { mutate: syncWithGist } = useMutation({
        mutationFn: updateUsersOnGist,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['gists/users'] });
        },
    });

    const authenticateUserCreds = useCallback(
        (credentials: LoginCredentials): AuthResult => {
            return authenticate(credentials, users);
        },
        [users]
    );

    const handlePinChange = useCallback(
        (employeeId: EmployeeId, newPin: string): void => {
            const attributesToUpdate: Partial<User> = {
                pin: newPin,
                isDefaultPassword: false,
            };
            const updatedUserArray = updateUserById(
                employeeId,
                attributesToUpdate,
                users
            );
            syncWithGist(updatedUserArray);
        },
        [users]
    );

    return { authenticateUserCreds, handlePinChange };
};

export default useAuth;
