import { useAppDispatch } from '../store';
import { showAlert } from '../store/helper.slice';
import type { Severity } from '../types';

const useAlert = () => {
    const dispatch = useAppDispatch();

    return (message: string, severity: Severity = 'success') => {
        dispatch(showAlert({ message, type: severity! }));
    };
};

export default useAlert;
