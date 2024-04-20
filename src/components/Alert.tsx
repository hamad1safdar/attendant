import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { closeAlert } from '../store/helper.slice';
import { useAppDispatch, useAppSelector } from '../store';

const Alert = () => {
    const {
        show,
        type: severity,
        message,
    } = useAppSelector((state) => state.helper.alert);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(closeAlert());
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={show}
            onClose={handleClose}
            autoHideDuration={3000}
        >
            <MuiAlert
                sx={{ width: '100%' }}
                severity={severity}
                onClose={handleClose}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

export default Alert;
