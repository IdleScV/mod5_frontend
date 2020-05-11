import React from './node_modules/react';
import SignOutButton from '../../authentication/SignOut';
import { AuthUserContext, withAuthorization } from '../../authentication/Session';
function Homepage() {
	return (
		<AuthUserContext.Consumer>
			{(authUser) => (
				<div>
					<h1>Account: {authUser.email}</h1>
				</div>
			)}
		</AuthUserContext.Consumer>
	);
}

const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Homepage);
