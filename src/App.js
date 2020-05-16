import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.component';
import HomePage from './Pages/HomePage/HomePage.component';
import Profile from './components/Profile/Profile.component';
import AllTimelinesContainer from './components/Containers/AllTimelinesContainer.component';
import Timeline from './components/Timeline/Timeline.component';
import NewTimeline from './components/Forms/NewTimeline/NewTimeline.component';

// Routes / path
import { ROUTES } from './urlEnv';

// Authentication
import Authentication from './authentication/Main/Authentication.component';
import { withAuthentication } from './authentication/Session';

import './App.css';
function App(props) {
	// console.log(props);
	return (
		<Router>
			<div className="App">
				<Navbar />
			</div>

			<Switch>
				<Route exact path={ROUTES.HOME} component={HomePage} />
				<Route exact path={ROUTES.TIMELINES} component={AllTimelinesContainer} />
				<Route exact path={ROUTES.PROFILE} component={Profile} />
				<Route path={ROUTES.TIMELINE} component={Timeline} />
				<Route exact path={ROUTES.CREATE} component={NewTimeline} />
				<Authentication />
			</Switch>
		</Router>
	);
}

export default withAuthentication(App);
