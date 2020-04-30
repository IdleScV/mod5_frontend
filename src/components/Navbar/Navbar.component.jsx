import React, { useState } from 'react';

// CSS
import './Navbar.style.css';
import { Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	}
}));

function Navbar(props) {
	const [ user, userSet ] = useState(true);
	const classes = useStyles();

	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
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
					{user ? (
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
							<MenuItem
								onClick={() => {
									handleClose();
									userSet(false);
								}}
							>
								<Link to="/">Log Out</Link>
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

							<MenuItem
								onClick={() => {
									handleClose();
									userSet(true);
								}}
							>
								<Link to="/">Log In</Link>
							</MenuItem>
						</Menu>
					)}

					{user ? yesUserLogged() : noUserLogged()}
				</Toolbar>
			</AppBar>
		</div>
	);
}

function yesUserLogged() {
	return (
		<div>
			<Switch>
				<Route exact path="/">
					<Typography variant="h6" color="inherit">
						HomePage
					</Typography>
				</Route>
				<Route exact path="/timelines">
					<Typography variant="h6" color="inherit">
						Browse Timelines
					</Typography>
				</Route>
				<Route exact path="/profile">
					<Typography variant="h6" color="inherit">
						Profile
					</Typography>
				</Route>
				<Route path="/timeline/:id">
					<Typography variant="h6" color="inherit">
						Timeline
					</Typography>
				</Route>
			</Switch>
		</div>
	);
}

function noUserLogged() {
	return (
		<Switch>
			<Route exact path="/">
				<Typography variant="h6" color="inherit">
					HomePage
				</Typography>
			</Route>
			<Route exact path="/timelines">
				<Typography variant="h6" color="inherit">
					Browse Timelines
				</Typography>
			</Route>
			<Route exact path="/timelines/:id">
				<Typography variant="h6" color="inherit">
					Timeline
				</Typography>
			</Route>
		</Switch>
	);
}

export default Navbar;
