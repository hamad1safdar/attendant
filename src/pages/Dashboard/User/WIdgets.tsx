import { type FC } from 'react';

import useAttendance from './useAttendance';

type ActionProps = {
    label: string;
    onClick: () => void;
};

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

const AccountActions: FC = () => {
    const { message, handleAttendanceClick, bookLeave } = useAttendance();

    return (
        <>
            {message}
            <div className="action-container centered-flex">
                <Action label="Punch In/Out" onClick={handleAttendanceClick} />
                <Action label="Book leave for today" onClick={bookLeave} />
                <Action label="View previous record" onClick={() => {}} />
            </div>
        </>
    );
};

export default AccountActions;
