import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Google from '@mui/icons-material/Google';
import LinkedIn from '@mui/icons-material/LinkedIn';

import type { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Link, useParams } from 'react-router-dom';

import './styles.css';

const AUTH_TYPES = {
    user: 'user',
    admin: 'admin',
};

const Auth: FC = () => {
    const { type } = useParams();
    return (
        <div className="auth-page centered-flex-column">
            <div className="auth-container centered-flex-column ">
                <h1 className="page-title">
                    Sign in as {type === AUTH_TYPES.admin ? 'Admin' : 'User'}
                </h1>
                <div className="auth-form centered-flex-column">
                    <StyledTextField
                        placeholder="Employee ID"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle htmlColor="#01bfa6" />
                            </InputAdornment>
                        }
                    />
                    <StyledTextField
                        placeholder="Pin"
                        startAdornment={
                            <InputAdornment position="start">
                                <Lock htmlColor="#01bfa6" />
                            </InputAdornment>
                        }
                    />
                    <StyledButton variant="contained">Login</StyledButton>
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
