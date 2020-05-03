import React from 'react';
import { AuthUserContext } from '../../authentication/Session';
function HomePage(props) {
	console.log(props);
	return (
		<div>
			<div>This is the Home Page</div>
			<AuthUserContext.Consumer>
				{(authUser) =>
					authUser ? (
						<div>
							<h2>This is the page shown when user is logged in.</h2>
							<div>Account: {authUser.email}</div>
						</div>
					) : (
						<div>This is the page shown if the user isn't logged in</div>
					)}
			</AuthUserContext.Consumer>
		</div>
	);
}

export default HomePage;
