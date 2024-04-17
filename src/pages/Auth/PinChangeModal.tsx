import {
    Dialog,
    DialogContent,
    DialogTitle,
    Button,
    InputBase,
    DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { type ChangeEvent, type FC, useState } from 'react';

interface PinChangeModalProps {
    open: boolean;
    close: () => void;
    onSaveClick: (pin: string) => void;
}

export const PinChangeModal: FC<PinChangeModalProps> = ({
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
                    <StyledTextField
                        value={values.pin}
                        name="pin"
                        placeholder="New pin"
                        onChange={handleChange}
                    />
                    <StyledTextField
                        name="confirmPin"
                        placeholder="Confirm pin"
                        value={values.confirmPin}
                        onChange={handleChange}
                    />
                </Container>
            </DialogContent>
            <DialogActions>
                <StyledButton onClick={handleSaveClick}>Save</StyledButton>
            </DialogActions>
        </Dialog>
    );
};

const StyledTextField = styled(InputBase)`
    border-radius: 25px;
    background-color: #f0f0f0;
    height: 45px;
    width: 320px;
    padding-left: 10px;
`;

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledButton = styled(Button)`
    width: fit-content;
    background-color: var(--primary-color);
    color: white;

    :hover {
        background-color: var(--primary-color);
    }
`;
