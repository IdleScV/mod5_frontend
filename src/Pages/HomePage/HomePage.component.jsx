import React from 'react';
import { AuthUserContext } from '../../authentication/Session';
import { Link } from 'react-router-dom';
import './HomePage.style.css';

// ROUTES
import * as AUTHROUTES from '../../constants/routes';
import { ROUTES } from '../../urlEnv';
function HomePage(props) {
	return (
		<div className="homepage">
			<h1 className="title">PATH</h1>
			<img
				className="gif"
				src="https://cdn.dribbble.com/users/1539152/screenshots/3296884/timeline.gif"
				alt="timelinegif"
			/>
			<div className="text">
				<AuthUserContext.Consumer>
					{(authUser) =>
						authUser ? (
							<div>
								<h2>You're Logged in with {authUser.email}</h2>
							</div>
						) : (
							<div>
								<h2>
									<Link to={AUTHROUTES.SIGN_UP}>Create an Account </Link> or{' '}
									<Link to={AUTHROUTES.SIGN_IN}>Signin</Link> to View & Create your own{' '}
									<Link to={ROUTES.TIMELINES}>Timelines</Link>!
								</h2>
							</div>
						)}
				</AuthUserContext.Consumer>
			</div>
		</div>
	);
}

export default HomePage;
