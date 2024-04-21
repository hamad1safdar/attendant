import {type FC} from 'react';

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

const UserActions = () => {
	return (
		<>
			<Action label="Punch Attendance" onClick={() => {}} />
			<Action label="Apply for leave" onClick={() => {}} />
			<Action label="View previous record" onClick={() => {}} />
		</>
	);
};

const AccountActions: FC = () => {



    
	return (
		<div className="action-container centered-flex">
			<UserActions />
		</div>
	);
};

export default AccountActions;
