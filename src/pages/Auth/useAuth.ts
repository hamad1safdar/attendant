import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAlert from '../../hooks/useAlert';

import { useAppDispatch } from '../../store';
import { authenticate } from '../../services/auth';

import { updateUser as updateUserById } from '../../services/users';
import { setCurrentUser } from '../../store/user.slice';
import type {
    AuthResult,
    AuthState,
    EmployeeId,
    LoginCredentials,
    User,
} from '../../types';
import useApp from '../../hooks/useApp';

const useAuth = () => {
    const { users, updateUsers, currentUser } = useApp();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const showAlert = useAlert();

    useEffect(() => {
        if (currentUser) {
            navigate('/dashboard');
        }
    }, [currentUser]);

    const authenticateUserCreds = useCallback(
        (credentials: LoginCredentials): AuthResult => {
            return authenticate(credentials, users!);
        },
        [users]
    );

    const handlePinChange = useCallback(
        async (employeeId: EmployeeId, newPin: string): Promise<void> => {
            const attributesToUpdate: Partial<User> = {
                pin: newPin,
                isDefaultPassword: false,
            };
            const updatedUserArray = updateUserById(
                employeeId,
                attributesToUpdate,
                users!
            );
            try {
                await updateUsers(updatedUserArray);
                showAlert(
                    'Pin updated successfully. Please login again to continue!'
                );
            } catch (error) {
                showAlert('Something went wrong!', 'error');
            }
        },
        [users]
    );

    const onAuthSuccess = (loggedInUser: AuthState) => {
        const user = users?.find(
            (user) => user.emplyeeId === loggedInUser.employeeId
        );
        if (user) {
            dispatch(setCurrentUser(user));
            navigate('/dashboard');
        }
    };

    return {
        authenticateUserCreds,
        handlePinChange,
        onAuthSuccess,
    };
};

export default useAuth;
