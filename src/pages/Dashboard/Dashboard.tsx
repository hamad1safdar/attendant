import Avatar from '@mui/material/Avatar';
import SettingIcon from '@mui/icons-material/Settings';

import { FC } from 'react';

import { useAppSelector } from '../../store';

import './styles.css';
import AccountActions from './AccountActions';
import { useNavigate } from 'react-router-dom';

const Dashboard: FC = () => {
    const navigate = useNavigate();
    //check is admin or user
    //check loggedin or not

    const currentUser = useAppSelector((state) => state.auth);

    if (!currentUser.loggedIn) {
        navigate('/auth/user');
        return;
    }

    const handleSettingsClick = () => {
        navigate('/admin/settings');
    };

    return (
        <div className="dashboard-page centered-flex-column">
            {currentUser.role === 'admin' && (
                <div
                    role="button"
                    onClick={handleSettingsClick}
                    className="settings"
                >
                    <SettingIcon fontSize="inherit" />
                </div>
            )}
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
            <AccountActions role={'admin'} />
        </div>
    );
};

export default Dashboard;
