import useAlert from '../../../hooks/useAlert';
import useApp from '../../../hooks/useApp';

import type { AttendanceRecord } from '../../../types';
import { getCurrentTime, getToday } from '../../../utils';

const useAttendance = () => {
    const {
        currentUser,
        punchIn,
        punchOut,
        bookLeave: requestLeave,
    } = useApp();

    const showAlert = useAlert();

    const record = currentUser!.record;

    const status = getAttendanceStatus(record, getToday());
    const message = makeMessage(status);

    const handleAttendanceClick = () => {
        if (status === 'ALLOW_ATTENDANCE') {
            punchIn({
                date: getToday(),
                punchIn: getCurrentTime(),
                punchOut: null,
                status: 'present',
            });

            return;
        }
        if (status === 'PENDING') {
            punchOut(getCurrentTime());
        }
        if (status === 'COMPLETED') {
            showAlert("You can't punch in till tomorrow!", 'error');
        }
    };

    const bookLeave = () => {
        if (status === 'ALLOW_ATTENDANCE') {
            requestLeave({
                date: getToday(),
                punchIn: null,
                punchOut: null,
                status: 'leave',
            });

            showAlert('Your leave has been booked for today.', 'success');
        }
        if (status === 'PENDING') {
            showAlert('Leave cannot be requested after punching in!', 'error');
        }
        if (status === 'COMPLETED') {
            showAlert(
                'Your workday has been marked completed for today. Try again tomorrow!',
                'info'
            );
        }
    };

    return { message, status, handleAttendanceClick, bookLeave };
};

export default useAttendance;

const makeMessage = (status: string) => {
    switch (status) {
        case 'ALLOW_ATTENDANCE':
            return "You haven't punched in!";
        case 'COMPLETED':
            return 'Horrah! No work till tomorrow!';
        case 'PENDING':
            return 'You are currently working today. Punch out to end your working day!';
        default:
            return 'Supress';
    }
};

const getAttendanceStatus = (
    records: Array<AttendanceRecord>,
    date: string
) => {
    if (records.length === 0) return 'ALLOW_ATTENDANCE'; // no record exists
    const recentRecord = records[0];
    if (recentRecord.date === date) {
        if (
            recentRecord.status === 'leave' ||
            (recentRecord.punchIn && recentRecord.punchOut)
        )
            return 'COMPLETED'; // can't punch in till next day
        if (recentRecord.punchIn && !recentRecord.punchOut) {
            return 'PENDING'; // only punch out
        }
    } else {
        return 'ALLOW_ATTENDANCE';
    }
    return 'To Supress';
};
