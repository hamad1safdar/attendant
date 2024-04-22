import {useState, type FC} from 'react';

import useAttendance from './useAttendance';
import RecordTable from './RecordTable';

type ActionProps = {
	label: string;
	onClick: () => void;
};

const Action: FC<ActionProps> = ({label, onClick}) => {
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
	const {message, handleAttendanceClick, bookLeave} = useAttendance();
	const [open, setOpen] = useState(false);

	return (
		<>
			{message}
			<div className="action-container centered-flex">
				<Action label="Punch In/Out" onClick={handleAttendanceClick} />
				<Action label="Book leave for today" onClick={bookLeave} />
				<Action
					label="View previous record"
					onClick={() => {
						setOpen(true); 
					}}
				/>
			</div>
			<RecordTable open={open} handleClose={() => {
				setOpen(false); 
			}} />
		</>
	);
};

export default AccountActions;
