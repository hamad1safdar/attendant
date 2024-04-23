import Avatar from '@mui/material/Avatar';

import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountActions from './User/WIdgets';
import AdminSettings from './AdminSettings';

import { useAppSelector } from '../../store';

import './styles.css';

const Dashboard: FC = () => {
    const navigate = useNavigate();

    const { currentUser } = useAppSelector((state) => state.users);

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
            return;
        }
    }, [currentUser]);

    if (!currentUser) return;

    return (
        <div className="dashboard-page centered-flex-column">
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
