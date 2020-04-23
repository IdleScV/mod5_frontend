import React, { useState } from 'react';
import './Navbar.style.css';

function Navbar() {
	const [ user, userSet ] = useState(true);

	return (
		<div>
			<button onClick={() => userSet(!user)}>{user ? 'Log Out' : 'Log In'}</button>
			{user ? yesUserLogged() : noUserLogged()}
		</div>
	);
}

function yesUserLogged() {
	return (
		<div className="nav-buttons">
			<button>Home</button>
			<button>Timelines</button>
			<button>Profile</button>
			<button>Create</button>
		</div>
	);
}

function noUserLogged() {
	return (
		<div className="nav-buttons">
			<button>Home</button>
			<button>Sign Up</button>
			<button>Sign In</button>
		</div>
	);
}

export default Navbar;
