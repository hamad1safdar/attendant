import type { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
    show: boolean;
}

const styles = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
};

const Loader: FC<LoaderProps> = ({ show = false }) => {
    if (!show) {
        return null;
    }
    return (
        <div className="centered-flex" style={styles}>
            <CircularProgress />
        </div>
    );
};

export default Loader;
