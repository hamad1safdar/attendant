import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store';
import { authenticate } from '../../services/auth';
import { updateUsers as updateUsersOnGist } from '../../services/gists';
import { updateUser as updateUserById } from '../../services/auth';
import { login } from '../../store/auth.slice';
import type {
    AuthResult,
    AuthState,
    EmployeeId,
    LoginCredentials,
    User,
} from '../../types';

const useAuth = () => {
    const { type } = useParams();
    const users = useAppSelector((state) => state.users);
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { mutate: syncWithGist } = useMutation({
        mutationFn: updateUsersOnGist,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gists/users'] });
            alert('Pin updated successfully. Please login again to continue!');
        },
        onError: () => {
            alert('Something went wrong!');
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

    const onAuthSuccess = (loggedInUser: AuthState) => {
        dispatch(login(loggedInUser));
        let navigateTo = '/dashboard';
        if (type === 'user') {
            navigateTo += '/user';
        }
        if (type === 'admin') {
            if (loggedInUser.role === 'admin') {
                navigateTo += '/admin';
            } else navigateTo += '/user';
        }
        navigate(navigateTo);
    };

    return {
        authenticateUserCreds,
        handlePinChange,
        onAuthSuccess,
        authRole: type,
    };
};

export default useAuth;
