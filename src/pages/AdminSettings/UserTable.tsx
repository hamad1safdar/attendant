import { DataGrid, GridToolbar } from '@mui/x-data-grid';

interface GridColumDef {
    field: string;
    headerName: string;
    width?: number;
    editable?: boolean;
    renderCell?: any;
}

const columns: Array<GridColumDef> = [
    { field: 'emplyeeId', headerName: 'ID' },
    { field: 'firstName', headerName: 'First name' },
    { field: 'lastName', headerName: 'Last name' },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'department', headerName: 'Department' },
    { field: 'position', headerName: 'Postion' },
];
const rows = [
    {
        emplyeeId: 'SE-000',
        firstName: 'Hamad',
        lastName: 'Safdar',
        email: 'hamad.safdar@emumba.com',
        pin: '1111',
        role: 'admin',
        department: 'Software Engineering',
        position: 'Frontend Engineer',
        hoursWorked: 0,
        joiningDate: '',
        isDefaultPassword: true,
    },
    {
        emplyeeId: 'SE-001',
        firstName: 'Hamad',
        lastName: 'Safdar',
        email: 'hamad.safdar@emumba.com',
        pin: '1111',
        role: 'admin',
        department: 'Software Engineering',
        position: 'Frontend Engineer',
        hoursWorked: 0,
        joiningDate: '',
        isDefaultPassword: true,
    },
    {
        emplyeeId: 'SE-002',
        firstName: 'Hamad',
        lastName: 'Safdar',
        email: 'hamad.safdar@emumba.com',
        pin: '1111',
        role: 'admin',
        department: 'Software Engineering',
        position: 'Frontend Engineer',
        hoursWorked: 0,
        joiningDate: '',
        isDefaultPassword: true,
    },
    {
        emplyeeId: 'SE-003',
        firstName: 'Hamad',
        lastName: 'Safdar',
        email: 'hamad.safdar@emumba.com',
        pin: '1111',
        role: 'admin',
        department: 'Software Engineering',
        position: 'Frontend Engineer',
        hoursWorked: 0,
        joiningDate: '',
        isDefaultPassword: true,
    },
];

const DataTable = () => {
    return (
        <div style={{ width: '1000px', margin: '0 auto' }}>
            <DataGrid
                disableRowSelectionOnClick
                onRowClick={(row) => console.log(row)}
                getRowId={(row) => row.emplyeeId}
                hideFooter
                columns={columns}
                rows={rows}
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
            ></DataGrid>
        </div>
    );
};
export default DataTable;
