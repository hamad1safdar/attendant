import {
    DataGrid,
    type GridRenderCellParams,
    GridToolbar,
} from '@mui/x-data-grid';

import { useAppDispatch, useAppSelector } from '../../../store';
import Button from '../../../components/Button';
import { type EmployeeId } from '../../../types';
import { deleteUser } from '../../../store/user.slice';

type GridColumDef = {
    field: string;
    headerName: string;
    width?: number;
    editable?: boolean;
    renderCell?: any;
    headerClassName: string;
    sortable?: boolean;
};

const columns: GridColumDef[] = [
    { field: 'emplyeeId', headerName: 'ID', flex: 0.5 },
    { field: 'firstName', headerName: 'First name' },
    { field: 'lastName', headerName: 'Last name' },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'position', headerName: 'Postion', width: 200 },
].map((d) => ({ flex: 1, ...d, headerClassName: 'datagrid-header' }));

const DataTable = () => {
    const { users } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    const handleDelete = (employeeId: EmployeeId) => {
        dispatch(deleteUser(employeeId));
    };

    const columnWithAction = [
        ...columns,
        {
            field: 'action',
            headerName: 'Actions',
            sortable: false,
            headerClassName: 'datagrid-header',
            renderCell: (params: GridRenderCellParams) => {
                const onClick = () => {
                    handleDelete(params.id as EmployeeId);
                };

                return <Button color='error' onClick={onClick}>Delete</Button>;
            },
        },
    ];

    const usersWithoutAdmin = users.filter((user) => user.role !== 'admin');
    return (
        <DataGrid
            disableRowSelectionOnClick
            getRowId={(row) => row.emplyeeId}
            getRowClassName={() => 'datagrid-row'}
            columns={columnWithAction}
            rows={usersWithoutAdmin}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{ toolbar: GridToolbar }}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                    printOptions: { disableToolbarButton: true },
                    csvOptions: { disableToolbarButton: true },
                },
            }}
        />
    );
};

export default DataTable;
