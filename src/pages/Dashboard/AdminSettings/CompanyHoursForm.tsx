import Button from '../../../components/Button';
import Input from '../../../components/Input';
import InputLabel from '@mui/material/InputLabel';

const CompanyHoursForm = () => {
	return (
		<div className="form">
			<h2>Change office hours</h2>
			<div className="inline-form centered-flex">
				<div>
					<InputLabel htmlFor="start-time">Start Time</InputLabel>
					<Input placeholder="Office Start Time" type="time" />
				</div>
				<div>
					<InputLabel htmlFor="end-time">End Time</InputLabel>
					<Input type="time" placeholder="Office End Time" />
				</div>
				<div>
					<InputLabel htmlFor="work-hours">
                        Min Working Hours
					</InputLabel>
					<Input
						type="number"
						placeholder="Min. Working Hours"
						inputProps={{min: 0, max: 10}}
					/>
				</div>
			</div>
			<Button sx={{marginTop: '10px'}}>Save</Button>
		</div>
	);
};

export default CompanyHoursForm;
