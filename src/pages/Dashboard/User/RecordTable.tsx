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
import { FC } from 'react';
import { useAppSelector } from '../../../store';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

interface Props {
    open: boolean;
    handleClose: () => void;
}

const RecordTable: FC<Props> = ({ open, handleClose }) => {
    const { record } = useAppSelector((state) => state.users.currentUser!);
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
                    <Input type="date" placeholder="Search date" />
                </div>
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
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RecordTable;
