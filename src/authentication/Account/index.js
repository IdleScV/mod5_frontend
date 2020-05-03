import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
// import {  } from '../Session';

const AccountPage = (props) => {
	console.log(props.firebase.W);
	return (
		<AuthUserContext.Consumer>
			{(authUser) => (
				<div>
					<h1>Account: {authUser.email}</h1>
					<PasswordForgetForm />
					<PasswordChangeForm />
				</div>
			)}
		</AuthUserContext.Consumer>
	);
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
