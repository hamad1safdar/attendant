import Button from '@mui/material/Button';

import {styled} from '@mui/material/styles';

export default styled(Button)`
    width: fit-content;
    background-color: var(--primary-color);
    color: white;
    :hover {
        background-color: var(--primary-color);
    }
`;
