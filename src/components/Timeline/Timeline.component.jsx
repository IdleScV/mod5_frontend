import React, { useState } from 'react';
import Event from './Event/Event.component';

import { timelineData } from '../../data/index';

import './Timeline.style.css';

function Timeline() {
	let [ filters, filtersSet ] = useState([]);

	// Destructured timeline data
	let { timeline_data_1 } = timelineData;
	let { events, title, user, person } = timeline_data_1;
	let { username, firebase_id } = user;
	let { birthday, deathday, name, initial_state } = person;
	let { age, location: place_of_birth } = initial_state;
	let { name: birth_city, country: { name: birth_country } } = place_of_birth;

	// ? current "date" format = "day/month/year"
	// * sort events by date
	const sortEvents = (event_data) =>
		event_data.sort((a, b) => a.date.substr(a.date.length - 4) > b.date.substr(b.date.length - 4));

	const processFilterClick = (e) => {
		console.log(e.target.name);
	};

	return (
		<div className="timeline-component">
			<h3 className="title">{title}</h3>
			<div onClick={processFilterClick} className="filters">
				<button name="major">Major</button>
				<button name="minor">Minor</button>
				<button name="personal">Personal</button>
				<button name="world">World</button>
				<button name="country">Country</button>
				<button name="city">City</button>
			</div>
			<div className="timeline-box">
				<div className="timeline-line" />
				<div className="birth year">{birthday.substr(birthday.length - 4)}</div>
				<div className="events">
					{sortEvents(events).map((event, i) => <Event event_data={event} key={i} index={i} />)}
				</div>
				{deathday ? (
					<div className="death year">{deathday.substr(deathday.length - 4)}</div>
				) : (
					<div className="present year">Present</div>
				)}
			</div>
		</div>
	);
}

export default Timeline;
