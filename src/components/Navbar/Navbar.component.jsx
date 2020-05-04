import React, { useState } from 'react';

// CSS
import './Navbar.style.css';
import { Link, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Authentication
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../../authentication/SignOut';
import { AuthUserContext } from '../../authentication/Session';
import { withFirebase } from '../../authentication/Firebase';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	}
}));

function Navbar(props) {
	const classes = useStyles();

	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root + ' navbar'}>
			<AppBar position="static">
				<Toolbar variant="dense">
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={handleClick}
					>
						<MenuIcon />
					</IconButton>
					{/* MENU STARTS HERE */}
					<AuthUserContext.Consumer>
						{(authUser) =>
							authUser ? (
								<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
									className="menu-dropdown"
								>
									<MenuItem onClick={handleClose}>
										<Link to="/">Home</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Link to="/timelines">Timelines</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Link to="/profile">Profile</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Link to="/create">Create</Link>
									</MenuItem>
									<MenuItem>
										<SignOutButton />
									</MenuItem>
								</Menu>
							) : (
								<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
									className="menu-dropdown"
								>
									<MenuItem onClick={handleClose}>
										<Link to="/">Home</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Link to="/timelines">Timelines</Link>
									</MenuItem>

									<MenuItem>
										<Link to={ROUTES.SIGN_IN}>Sign In</Link>
									</MenuItem>
									<MenuItem>
										<Link to={ROUTES.SIGN_UP}>Sign Up</Link>
									</MenuItem>
								</Menu>
							)}
					</AuthUserContext.Consumer>
					<div className="title">
						<Switch>
							<Route exact path="/">
								HOME
							</Route>
							<Route exact path="/timelines">
								BROWSE
							</Route>
							<Route exact path="/profile">
								PROFILE
							</Route>
							<Route path="/timeline/:id">TIMELINE</Route>
							<Route exact path="/create">
								CREATE
							</Route>
						</Switch>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Navbar;
