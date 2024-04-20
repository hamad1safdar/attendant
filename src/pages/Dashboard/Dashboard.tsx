import Avatar from '@mui/material/Avatar';

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountActions from './User/WIdgets';
import AdminSettings from './AdminSettings';
import Button from '../../components/Button';

import { useAppDispatch, useAppSelector } from '../../store';

import './styles.css';
import { logout } from '../../store/user.slice';

const Dashboard: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { currentUser } = useAppSelector((state) => state.users);

    if (!currentUser) {
        navigate('/');
        return;
    }

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="dashboard-page centered-flex-column">
            <div className="logout">
                <Button onClick={handleLogout}>Logout</Button>
            </div>
            <div className="user-info">
                <Avatar
                    sx={{
                        width: '150px',
                        height: '150px',
                        margin: '0 auto',
                        marginBottom: '15px',
                    }}
                />
                <p className="greetings">
                    Hi, {currentUser.firstName + ' ' + currentUser.lastName}
                </p>
            </div>
            {currentUser.role === 'admin' && <AdminSettings />}
            {currentUser.role === 'user' && <AccountActions />}
        </div>
    );
};

export default Dashboard;
