import React from 'react';
import { Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';

const Authentication = () => {
	return (
		<div>
			<Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
			<Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
			<Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
			<Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
		</div>
	);
};

export default withAuthentication(Authentication);
