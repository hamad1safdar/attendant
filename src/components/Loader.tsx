import type {FC} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

type LoaderProps = {
	show: boolean;
};

const Loader: FC<LoaderProps> = ({show = false}) => {
	if (!show) {
		return null;
	}

	return (
		<Backdrop
			sx={{
				zIndex: 1000,
			}}
			open={show}
		>
			<CircularProgress />
		</Backdrop>
	);
};

export default Loader;
