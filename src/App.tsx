import { useEffect, type FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AdminSettings from './pages/AdminSettings';

import { useAppDispatch } from './store';
import { getUsers } from './services/gists';
import { setUsers } from './store/user.slice';

import './App.css';

const NotFound: FC = () => <div>Not Found</div>;

function App() {
    const dispatch = useAppDispatch();
    const { data: usersData } = useQuery({
        queryKey: ['gists/users'],
        queryFn: () => getUsers(),
    });

    useEffect(() => {
        if (usersData) {
            dispatch(setUsers(usersData));
        }
    }, [usersData]);

    return (
        <Routes>
            <Route path="/auth/:type" element={<Auth />} />
            <Route path="/dashboard/:role" element={<Dashboard />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
