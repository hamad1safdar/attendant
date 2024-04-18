import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useAppSelector } from '../../store';

interface GridColumDef {
    field: string;
    headerName: string;
    width?: number;
    editable?: boolean;
    renderCell?: any;
    headerClassName: string;
}

const columns: Array<GridColumDef> = [
    { field: 'emplyeeId', headerName: 'ID' },
    { field: 'firstName', headerName: 'First name' },
    { field: 'lastName', headerName: 'Last name' },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'position', headerName: 'Postion', width: 200 },
].map((d) => ({ ...d, headerClassName: 'datagrid-header' }));

const DataTable = () => {
    const users = useAppSelector((state) => state.users);
    return (
        <DataGrid
            disableRowSelectionOnClick
            getRowId={(row) => row.emplyeeId}
            getRowClassName={() => 'datagrid-row'}
            columns={columns}
            rows={users}
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
