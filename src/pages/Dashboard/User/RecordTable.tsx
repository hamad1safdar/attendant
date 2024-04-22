import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import {type ChangeEvent, type FC, useEffect, useState} from 'react';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {useAppSelector} from '../../../store';
import type {AttendanceRecord} from '../../../types';
import {getFormattedDate, unformatDate} from '../../../utils';

type Props = {
	open: boolean;
	handleClose: () => void;
};

const RecordTable: FC<Props> = ({open, handleClose}) => {
	const {record} = useAppSelector((state) => state.users.currentUser!);
	const [query, setQuery] = useState('');
	const [filtered, setFiltered] = useState<AttendanceRecord[]>(record);
	const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {value} = e.target;
		if (!value) return;
		setQuery(getFormattedDate(new Date(value)));
	};

	useEffect(() => {
		if (query) {
			setFiltered(record.filter((r) => r.date.includes(query)));
		} else {
			setFiltered(record);
		}
	}, [query]);
	return (
		<Dialog open={open} fullWidth maxWidth="xl">
			<DialogTitle>Attendance Record</DialogTitle>
			<DialogContent>
				<div
					style={{
						width: '100%',
						margin: '0 auto',
						textAlign: 'center',
						padding: '30px 0',
					}}
				>
					<Input
						onChange={handleDateChange}
						value={unformatDate(query)}
						type="date"
						placeholder="Search date"
					/>
				</div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filtered.map((r) => (
							<TableRow key={r.date}>
								<TableCell>{r.date}</TableCell>
								<TableCell>{r.status}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

export default RecordTable;
