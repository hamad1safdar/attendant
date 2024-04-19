import Avatar from '@mui/material/Avatar';

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountActions from './AccountActions';
import AdminSettings from './AdminSettings';

import { useAppSelector } from '../../store';

import './styles.css';

const Dashboard: FC = () => {
    const navigate = useNavigate();

    const { currentUser } = useAppSelector((state) => state.users);

    if (!currentUser) {
        navigate('/');
        return;
    }

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
            {currentUser.role === 'user' && <AccountActions role={'user'} />}
        </div>
    );
};

export default Dashboard;
