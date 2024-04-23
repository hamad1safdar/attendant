import { type FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useIsFetching } from '@tanstack/react-query';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Alert from './components/Alert';
import Loader from './components/Loader';
import useApp from './hooks/useApp';

import './App.css';

const NotFound: FC = () => <div>Not Found</div>;

function App() {
    useApp();
    const isFetching = useIsFetching();

    return (
        <>
            <Alert />
            <Loader show={!!isFetching} />
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
