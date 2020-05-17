import React from 'react';

// CSS
import './Navbar.style.css';
import { Link, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Authentication
import SignOutButton from '../../authentication/SignOut';
import { AuthUserContext } from '../../authentication/Session';

// Routes
import { ROUTES } from '../../urlEnv';
import * as AUTHROUTES from '../../constants/routes';

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
										<Link to={ROUTES.HOME}>Home</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Link to={ROUTES.TIMELINES}>Timelines</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Link to={ROUTES.PROFILE}>Profile</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Link to={ROUTES.CREATE}>Create</Link>
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
										<Link to={ROUTES.HOME}>Home</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Link to={ROUTES.TIMELINES}>Timelines</Link>
									</MenuItem>

									<MenuItem>
										<Link to={AUTHROUTES.SIGN_IN}>Sign In</Link>
									</MenuItem>
									<MenuItem>
										<Link to={AUTHROUTES.SIGN_UP}>Sign Up</Link>
									</MenuItem>
								</Menu>
							)}
					</AuthUserContext.Consumer>
					<div className="title">
						<Switch>
							<Route exact path={ROUTES.HOME}>
								HOME
							</Route>
							<Route exact path={ROUTES.TIMELINES}>
								BROWSE
							</Route>
							<Route exact path={ROUTES.PROFILE}>
								PROFILE
							</Route>
							<Route path={ROUTES.TIMELINE}>TIMELINE</Route>
							<Route exact path={ROUTES.CREATE}>
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
