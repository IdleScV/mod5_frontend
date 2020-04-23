import React from 'react';
// import { Counter } from './features/counter/Counter';

import Navbar from './components/Navbar/Navbar.component';
import HomePage from './Pages/HomePage/HomePage.component';
import Timeline from './components/Timeline/Timeline.component';
import './App.css';
function App() {
	return (
		<div className="App">
			<Navbar />
			{/* <HomePage /> */}
			<Timeline />
		</div>
	);
}

export default App;
