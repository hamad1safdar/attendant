import CompanyHoursForm from './CompanyHoursForm';
import AddUserForm from './UserAddForm';
import DataTable from './UserTable';

import './styles.css';

const AdminSettings = () => {
    return (
        <>
            <h1>Settings</h1>
            <DataTable />
            <CompanyHoursForm />
            <AddUserForm />
        </>
    );
};

export default AdminSettings;
