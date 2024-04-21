import {useState} from 'react';
import type {ChangeEvent, FC} from 'react';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
} from '@mui/material';
import {styled} from '@mui/material/styles';

import Button from '../../components/Button';
import Input from '../../components/Input';
import useAlert from '../../hooks/useAlert';

type PinChangeModalProps = {
	open: boolean;
	close: () => void;
	onSaveClick: (pin: string) => void;
};

const PinChangeModal: FC<PinChangeModalProps> = ({
	open,
	close,
	onSaveClick,
}) => {
	const [values, setValues] = useState({pin: '', confirmPin: ''});
	const showAlert = useAlert();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value, name} = event.target;
		setValues((prev) => ({...prev, [name]: value}));
	};

	const handleSaveClick = () => {
		if (!values.pin || !values.confirmPin) {
			showAlert('Please provide new pin and confirm pin!', 'error');
			return;
		}

		if (values.pin.length !== 4) {
			showAlert('Pin must be of 4 characters!', 'error');
			return;
		}

		if (values.pin !== values.confirmPin) {
			showAlert('Please provide same pin!', 'error');
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
