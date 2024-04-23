import {type FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Alert from './components/Alert';
import Loader from './components/Loader';
import useApp from './hooks/useApp';
import Button from './components/Button';

import {useAppDispatch} from './store';
import {logout} from './store/user.slice';

import './App.css';

const NotFound: FC = () => <div>Not Found</div>;

function App() {
	const {isLoading, currentUser} = useApp();
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<>
			{currentUser && (
				<div className="logout">
					<Button onClick={handleLogout}>Logout</Button>
				</div>
			)}
			<Alert />
			<Loader show={isLoading} />
			<Routes>
				<Route path="/auth" element={<Auth />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="*" element={<Navigate to={'/auth'} />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
