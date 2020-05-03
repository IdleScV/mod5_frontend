import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './index.css';

const SignUpPage = () => (
	<div>
		<h4>Sign Up Form</h4>
		<SignUpForm />
	</div>
);
// Setting an initial state so we can reset after successful signup
const INITIAL_STATE = {
	username: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	firebaseID: '',
	error: null
};

class SignUpFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const { username, email, passwordOne } = this.state;
		this.props.firebase
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			//* saves user into firebase realtime database
			.then((authUser) => {
				// console.log(authUser.W, username);
				return this.props.firebase.user(authUser.user.uid).set({
					username,
					email
				});
			})
			//* resets signup form state & sends user to home page
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push(ROUTES.HOME);
			})
			.catch((error) => {
				this.setState({ error });
			});
		event.preventDefault();
	};

	// onChange handler allows input fields to capture & update local state information
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { username, email, passwordOne, passwordTwo, error } = this.state;
		// Validation logic
		const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
		return (
			<div className="signuppage">
				<form onSubmit={this.onSubmit} className="signup">
					<TextField
						className="textinput"
						id="standard-basic"
						label="Username"
						name="username"
						value={username}
						onChange={this.onChange}
					/>
					<br />
					<TextField
						className="textinput"
						id="standard-basic"
						label="Email"
						name="email"
						value={email}
						onChange={this.onChange}
					/>
					<br />
					<TextField
						className="textinput"
						id="standard-basic"
						label="Password"
						name="passwordOne"
						value={passwordOne}
						onChange={this.onChange}
						type="password"
					/>
					<br />
					<TextField
						className="textinput"
						id="standard-basic"
						label="Confirm Password"
						name="passwordTwo"
						value={passwordTwo}
						onChange={this.onChange}
						type="password"
					/>
					<br />
					<Button type="submit" disabled={isInvalid}>
						Sign Up
					</Button>
					{error && <p>{error.message}</p>}
				</form>
			</div>
		);
	}
}

const SignUpLink = () => {
	return (
		<p>
			Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
		</p>
	);
};

//* uses (withFirebase & withRouter) higher-order component here
// const SignUpForm = withRouter(withFirebase(SignUpFormBase)); << refactored with compose bellow
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
