import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { FC } from 'react';
import { useAppSelector } from '../../../store';
import Input from '../../../components/Input';

interface Props {
    open: boolean;
}

const RecordTable: FC<Props> = ({ open }) => {
    const { firstName, lastName, record } = useAppSelector(
        (state) => state.users.currentUser!
    );
    return (
        <Dialog open={open} fullWidth maxWidth="xl">
            <DialogTitle>Attendance Record</DialogTitle>
            <DialogContentText>{firstName + ' ' + lastName}</DialogContentText>
            <DialogContent>
                <Input type="date" placeholder="Search date" />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {record.map((r) => (
                            <TableRow key={r.date}>
                                <TableCell>{r.date}</TableCell>
                                <TableCell>{r.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    );
};

export default RecordTable;
