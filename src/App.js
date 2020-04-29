import React from 'react';
// import { Counter } from './features/counter/Counter';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.component';
import HomePage from './Pages/HomePage/HomePage.component';
import Profile from './components/Profile/Profile.component';
import AllTimelinesContainer from './components/Containers/AllTimelinesContainer.component';
import Timeline from './components/Timeline/Timeline.component';

import './App.css';
function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
			</div>

			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/timelines" component={AllTimelinesContainer} />
				<Route exact path="/profile" component={Profile} />
				<Route path="/timeline/:id" component={Timeline} />
			</Switch>
		</Router>
	);
}

export default App;
