import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Google from '@mui/icons-material/Google';
import LinkedIn from '@mui/icons-material/LinkedIn';

import { type ChangeEvent, useCallback, useState, type FC } from 'react';
import { styled } from '@mui/material/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppSelector } from '../../store';
import { authenticate } from '../../services/auth';
import { PinChangeModal } from './PinChangeModal';

import './styles.css';
import { updateUsers as updateUsersOnGist } from '../../services/gists';
import { updateUser } from '../../services/auth';
import { AuthResult } from '../../types';

const AUTH_TYPES = {
    user: 'user',
    admin: 'admin',
};

const Auth: FC = () => {
    const { type } = useParams();
    const [credentials, setCredentials] = useState({ employeeId: '', pin: '' });
    const [openPinChangeModal, setOpenPinChangeModal] = useState(false);
    const [authResult, setResult] = useState<AuthResult | null>(null);
    const users = useAppSelector((state) => state.users);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: updateUsersOnGist,
        onSettled: (_data, _error) => {
            queryClient.invalidateQueries({ queryKey: ['gists/users'] });
        },
    });

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setCredentials((prev) => ({ ...prev, [name]: value }));
        },
        [setCredentials]
    );

    const handleAuthenticate = useCallback(() => {
        if (!credentials.employeeId || !credentials.pin) {
            alert('Please add required fields');
            return;
        }
        const result = authenticate(credentials, users);
        if (result.success) {
            setResult(result);
            if (result.loggedInUser?.isDefaultPassword) {
                openModal();
            } else {
                navigate('/', { replace: true });
            }
        } else {
            alert('Invalid employee ID or pin!');
        }
    }, [credentials, users]);

    const openModal = () => {
        setOpenPinChangeModal(true);
    };
    const closeModal = () => {
        setOpenPinChangeModal(false);
    };

    const handleSaveClick = (newPin: string) => {
        const updatedUsers = updateUser(
            authResult?.loggedInUser?.employeeId!,
            { pin: newPin, isDefaultPassword: false },
            users
        );
        mutate(updatedUsers);
    };

    return (
        <div className="auth-page centered-flex-column">
            <PinChangeModal
                open={openPinChangeModal}
                close={closeModal}
                onSaveClick={handleSaveClick}
            />
            <div className="auth-container centered-flex-column ">
                <h1 className="page-title">
                    Sign in as {type === AUTH_TYPES.admin ? 'Admin' : 'User'}
                </h1>
                <div className="auth-form centered-flex-column">
                    <StyledTextField
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
                    <StyledTextField
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
                    <StyledButton
                        variant="contained"
                        onClick={handleAuthenticate}
                    >
                        Login
                    </StyledButton>
                    <p>Or sign in using social platforms</p>
                    <SocialPlatformContainer>
                        <StyledLink to="#">
                            <Facebook fontSize="large" />
                        </StyledLink>
                        <StyledLink to="#">
                            <Twitter fontSize="large" />
                        </StyledLink>
                        <StyledLink to="#">
                            <Google fontSize="large" />
                        </StyledLink>
                        <StyledLink to="#">
                            <LinkedIn fontSize="large" />
                        </StyledLink>
                    </SocialPlatformContainer>
                    <div>
                        Or are you{' '}
                        {type === AUTH_TYPES.admin ? 'an admin' : 'a user'}?{' '}
                        <StyledLink
                            primary
                            to={
                                type === AUTH_TYPES.admin
                                    ? '/auth/user'
                                    : '/auth/admin'
                            }
                        >
                            Signin as{' '}
                            {type === AUTH_TYPES.admin ? 'user' : 'admin'}{' '}
                            instead?
                        </StyledLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;

const StyledTextField = styled(InputBase)`
    border-radius: 25px;
    background-color: #f0f0f0;
    height: 45px;
    width: 320px;
    padding-left: 10px;
`;

const StyledButton = styled(Button)`
    width: fit-content;
    background-color: var(--primary-color);

    :hover {
        background-color: var(--primary-color);
    }
`;

const StyledLink = styled(Link)<{ primary?: boolean }>(({ primary }) => ({
    color: primary ? 'var(--primary-color)' : 'black',
    fontWeight: primary ? 700 : 400,
}));

const SocialPlatformContainer = styled('div')``;
