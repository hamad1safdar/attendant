import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import type { FC } from 'react';
import Button from './Button';

interface ConfirmationDialogProps {
    open: boolean;
    message?: string;
    title?: string;
    positiveButtonText?: string;
    negativeButtonText?: string;
    onClose: () => void;
    onPositive: () => void;
    onNegative?: () => void;
    isPositiveDanger?: boolean;
}

const Confirmation: FC<ConfirmationDialogProps> = ({
    open,
    positiveButtonText,
    negativeButtonText,
    title,
    message,
    isPositiveDanger,
    onClose,
    onNegative,
    onPositive,
}) => {
    const handlePositive = () => {
        onClose?.();
        onPositive?.();
    };
    const handleNegative = () => {
        onClose?.();
        onNegative?.();
    };
    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleNegative}>{negativeButtonText}</Button>
                <Button
                    color={isPositiveDanger ? 'error' : 'primary'}
                    onClick={handlePositive}
                >
                    {positiveButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

Confirmation.defaultProps = {
    open: false,
    positiveButtonText: 'Yes',
    negativeButtonText: 'No',
    message: 'Do you want to proceed?',
    title: 'Are you sure?',
    isPositiveDanger: false,
};

export default Confirmation;
