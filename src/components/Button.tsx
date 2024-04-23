import Button from '@mui/material/Button';

import {styled} from '@mui/material/styles';

export default styled(Button)`
    --background: ${(props) =>
		props.color === 'error'
			? 'var(--danger-color)'
			: 'var(--primary-color)'};
    width: fit-content;
    background-color: var(--background);
    color: white;
    :hover {
        background-color: var(--background);
    }
`;
