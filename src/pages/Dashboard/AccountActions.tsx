import { FC } from 'react';

interface AccountActionsProps {
    role: 'admin' | 'user';
}

interface ActionProps {
    label: string;
    onClick: () => void;
}

const Action: FC<ActionProps> = ({ label, onClick }) => {
    return (
        <div
            className="action-btn centered-flex"
            role="button"
            onClick={onClick}
        >
            {label}
        </div>
    );
};

const AdminActions = () => {
    return (
        <>
            <Action label="Today's Availiblity" onClick={() => {}} />
            <Action label="Overall Stats" onClick={() => {}} />
        </>
    );
};

const UserActions = () => {
    return (
        <>
            <Action label="Punch Attendance" onClick={() => {}} />
            <Action label="Apply for leave" onClick={() => {}} />
            <Action label="View previous record" onClick={() => {}} />
        </>
    );
};

const AccountActions: FC<AccountActionsProps> = ({ role }) => {
    return (
        <div className="action-container centered-flex">
            {role === 'admin' ? <AdminActions /> : <UserActions />}
        </div>
    );
};

export default AccountActions;
