import Lock from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { Link } from 'react-router-dom';
import type { ChangeEvent, FC } from 'react';
import { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';

import SocialLogins from './SocialLogins';
import Input from '../../components/Input';
import Button from '../../components/Button';
import PinChangeModal from './PinChangeModal';

import useAuth from './useAuth';
import useModal from '../../hooks/useModal';

import './styles.css';

const AUTH_ROLES = {
    user: 'user',
    admin: 'admin',
};

const Auth: FC = () => {
    const [credentials, setCredentials] = useState({ employeeId: '', pin: '' });

    const { isOpen, openModal, closeModal } = useModal();
    const { authRole, handlePinChange, authenticateUserCreds, onAuthSuccess } =
        useAuth();

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleAuthenticate = () => {
        if (!credentials.employeeId || !credentials.pin) {
            alert('Please add required fields');
            return;
        }
        const result = authenticateUserCreds(credentials);
        if (result.success) {
            if (result.loggedInUser?.isDefaultPassword) {
                openModal();
            } else {
                onAuthSuccess(result.loggedInUser!);
            }
        } else {
            alert('Invalid employee ID or pin!');
        }
    };

    const handleSaveClick = (newPin: string) =>
        handlePinChange(credentials.employeeId, newPin);

    return (
        <div className="auth-page centered-flex-column">
            <PinChangeModal
                open={isOpen}
                close={closeModal}
                onSaveClick={handleSaveClick}
            />
            <div className="auth-container centered-flex-column ">
                <h1 className="page-title">
                    Sign in as{' '}
                    {authRole === AUTH_ROLES.admin ? 'Admin' : 'User'}
                </h1>
                <div className="auth-form centered-flex-column">
                    <Input
                        name="employeeId"
                        onChange={handleChange}
                        placeholder="Employee ID"
                        value={credentials.employeeId}
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle htmlColor="#01bfa6" />
                            </InputAdornment>
                        }
                    />
                    <Input
                        name="pin"
                        placeholder="Pin"
                        onChange={handleChange}
                        value={credentials.pin}
                        startAdornment={
                            <InputAdornment position="start">
                                <Lock htmlColor="#01bfa6" />
                            </InputAdornment>
                        }
                    />
                    <Button variant="contained" onClick={handleAuthenticate}>
                        Login
                    </Button>
                    <SocialLogins />
                    {/**TODO: Refactor this conditional to a new condition component */}
                    <div>
                        Or are you{' '}
                        {authRole === AUTH_ROLES.admin ? 'an admin' : 'a user'}?{' '}
                        <StyledLink
                            primary
                            to={
                                authRole === AUTH_ROLES.admin
                                    ? '/auth/user'
                                    : '/auth/admin'
                            }
                        >
                            Signin as{' '}
                            {authRole === AUTH_ROLES.admin ? 'user' : 'admin'}{' '}
                            instead?
                        </StyledLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;

const StyledLink = styled(Link)<{ primary?: boolean }>(({ primary }) => ({
    color: primary ? 'var(--primary-color)' : 'black',
    fontWeight: primary ? 700 : 400,
}));
