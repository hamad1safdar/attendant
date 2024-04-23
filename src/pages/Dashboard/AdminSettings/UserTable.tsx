import { useCallback, useState } from 'react';
import {
    DataGrid,
    GridToolbar,
    type GridRenderCellParams,
} from '@mui/x-data-grid';

import Button from '../../../components/Button';
import Confirmation from '../../../components/Confirmation';

import { type EmployeeId } from '../../../types';

import useApp from '../../../hooks/useApp';

interface GridColumDef {
    field: string;
    headerName: string;
    width?: number;
    editable?: boolean;
    renderCell?: any;
    headerClassName: string;
    sortable?: boolean;
}

const columns: GridColumDef[] = [
    { field: 'emplyeeId', headerName: 'ID', flex: 0.5 },
    { field: 'firstName', headerName: 'First name' },
    { field: 'lastName', headerName: 'Last name' },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'position', headerName: 'Postion', width: 200 },
].map((d) => ({ flex: 1, headerClassName: 'datagrid-header', ...d }));

const DataTable = () => {
    const { users, deleteUser } = useApp();
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<EmployeeId>('');

    const handlePositiveDelete = useCallback(() => {
        if (!selectedId) return;
        deleteUser(selectedId);
    }, [selectedId]);

    const handleDeleteClick = (employeeId: EmployeeId) => {
        setOpenConfirmationDialog(true);
        setSelectedId(employeeId);
    };

    const columnWithAction: GridColumDef[] = [
        ...columns,
        {
            field: 'action',
            headerName: 'Actions',
            sortable: false,
            headerClassName: 'datagrid-header',
            renderCell: (params: GridRenderCellParams) => {
                const onClick = () => {
                    handleDeleteClick(params.id as EmployeeId);
                };
                return (
                    <Button color="error" onClick={onClick}>
                        Delete
                    </Button>
                );
            },
        },
    ];

    const usersWithoutAdmin = users?.filter((user) => user.role !== 'admin');
    return (
        <>
            <Confirmation
                open={openConfirmationDialog}
                onPositive={handlePositiveDelete}
                onClose={() => setOpenConfirmationDialog(false)}
                message={`Are you sure you want to delete record of ${selectedId}?`}
                positiveButtonText="Delete"
                negativeButtonText="Canel"
                isPositiveDanger
            />
            <DataGrid
                disableRowSelectionOnClick
                getRowId={(row) => row.emplyeeId}
                getRowClassName={() => 'datagrid-row'}
                columns={columnWithAction}
                rows={usersWithoutAdmin}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                autoHeight
                localeText={{
                    noRowsLabel: 'No users exists. Add users to display.',
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        printOptions: { disableToolbarButton: true },
                        csvOptions: { disableToolbarButton: true },
                    },
                }}
            />
        </>
    );
};

export default DataTable;
