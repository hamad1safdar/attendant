import { useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

interface PinChangeModalProps {
    open: boolean;
    close: () => void;
    onSaveClick: (pin: string) => void;
}

const PinChangeModal: FC<PinChangeModalProps> = ({
    open,
    close,
    onSaveClick,
}) => {
    const [values, setValues] = useState({ pin: '', confirmPin: '' });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = () => {
        if (!values.pin || !values.confirmPin) {
            alert('Please provide new pin and confirm pin!');
            return;
        }
        if (values.pin.length !== 4) {
            alert('Pin must be of 4 characters!');
            return;
        }
        if (values.pin !== values.confirmPin) {
            alert('Please provide same pin!');
            return;
        }

        onSaveClick(values.pin);
        close();
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Change password for your account</DialogTitle>
            <DialogContent>
                <Container>
                    <Input
                        value={values.pin}
                        name="pin"
                        placeholder="New pin"
                        onChange={handleChange}
                        type="password"
                        inputProps={{
                            maxLength: 4,
                        }}
                    />
                    <Input
                        name="confirmPin"
                        placeholder="Confirm pin"
                        type="passwrod"
                        value={values.confirmPin}
                        onChange={handleChange}
                        inputProps={{
                            maxLength: 4,
                        }}
                    />
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSaveClick}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PinChangeModal;

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
