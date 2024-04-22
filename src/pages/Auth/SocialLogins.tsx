import {styled} from '@mui/material/styles';
import {Link} from 'react-router-dom';

import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Google from '@mui/icons-material/Google';
import LinkedIn from '@mui/icons-material/LinkedIn';

const StyledLink = styled(Link)<{primary?: boolean}>(() => ({
	color: 'black',
	fontWeight: 400,
}));

const Container = styled('div')`
    text-align: center;
`;

const SocialLogins = () => (
	<Container>
		<p>Or sign in using social platforms</p>
		<StyledLink to="#">
			<Facebook fontSize="large" />
		</StyledLink>
		<StyledLink to="#">
			<Twitter fontSize="large" />
		</StyledLink>
		<StyledLink to="#">
			<Google fontSize="large" />
		</StyledLink>
		<StyledLink to="#">
			<LinkedIn fontSize="large" />
		</StyledLink>
	</Container>
);

export default SocialLogins;
