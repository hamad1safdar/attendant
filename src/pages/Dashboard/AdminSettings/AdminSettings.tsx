import AddUserForm from './UserAddForm';
import DataTable from './UserTable';

import './styles.css';

const AdminSettings = () => {
	return (
		<div className="centered-flex-column">
			<h1 className="page-title">Admin Settings</h1>
			<AddUserForm />
			<div className="table-container">
				<DataTable />
			</div>
		</div>
	);
};

export default AdminSettings;
