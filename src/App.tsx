import { useEffect, type FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Auth from './pages/Auth';

import { useAppDispatch } from './store';
import { getUsers } from './services/gists';
import { setUsers } from './store/user.slice';

import './App.css';

const NotFound: FC = () => <div>Not Found</div>;

function App() {
    const dispatch = useAppDispatch();
    const { data } = useQuery({
        queryKey: ['gists/users'],
        queryFn: () => getUsers(),
    });

    useEffect(() => {
        if (data) {
            dispatch(setUsers(data));
        }
    }, [data]);

    return (
        <Routes>
            <Route path="/auth/:type" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
