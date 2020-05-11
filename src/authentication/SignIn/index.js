import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './index.css';

const SignInPage = () => (
	<div>
		<h4>Sign In Form</h4>
		<SignInForm />
	</div>
);

const INITIAL_STATE = {
	email: '',
	password: '',
	error: null
};

class SignInFormBase extends React.Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const { email, password } = this.state;
		this.props.firebase
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push(ROUTES.HOME);
			})
			.catch((error) => {
				this.setState({ error });
			});
		event.preventDefault();
	};

	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	guestSignIn = (event) => {
		this.props.firebase
			.doSignInWithEmailAndPassword('guest@gmail.com', '123456')
			.then(() => {
				this.setState({ ...INITIAL_STATE });
				this.props.history.push(ROUTES.HOME);
			})
			.catch((error) => {
				this.setState({ error });
			});
	};

	render() {
		const { email, password, error } = this.state;
		const isInvalid = password === '' || email === '';
		return (
			<div className="signinpage">
				<form onSubmit={this.onSubmit} className="signin">
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
						name="password"
						value={password}
						onChange={this.onChange}
						type="password"
					/>
					<br />
					<div className="buttons">
						<Button type="submit" disabled={isInvalid}>
							Sign In
						</Button>
						<Button onClick={this.guestSignIn}>Guest Login</Button>
					</div>
					{error ? <p>{error.message}</p> : null}
				</form>
				<div className="xtralinks">
					<br />
					<PasswordForgetLink />
					<br />
					<SignUpLink />
				</div>
			</div>
		);
	}
}
const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;
export { SignInForm };
