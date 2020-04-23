import React, { useState } from 'react';
import Event from './Event/Event.component';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import './Timeline.style.css';
// Data
import { timelineData } from '../../data/index';

// for inline styling
const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(0.5)
	}
}));

function Timeline() {
	const inlineStyles = useStyles();
	let [ filters, filtersSet ] = useState([]);
	let [ range, rangeSet ] = useState(10);

	// Destructured timeline data
	let { timeline_data_1 } = timelineData;
	let { events, title, user, person } = timeline_data_1;
	let { username, firebase_id } = user;
	let { birthday, deathday, name, initial_state } = person;
	let { age, location: place_of_birth } = initial_state;
	let { name: birth_city, country: { name: birth_country } } = place_of_birth;

	const buttonTypes = [
		{ name: 'Major', color: 'primary' },
		{ name: 'Minor', color: 'primary' },
		{ name: 'Personal', color: 'primary' },
		{ name: 'World', color: 'primary' },
		{ name: 'Country', color: 'primary' },
		{ name: 'City', color: 'primary' }
	];

	// ? current "date" format = "day/month/year"
	// * sort events by date
	const processFilterClick = (e) => {
		let value = e.currentTarget.name;
		if (filters.includes(value)) {
			filtersSet(filters.filter((item) => item !== value));
		} else {
			filtersSet(filters.concat(value));
		}
	};

	const findYear = (num_string) => {
		return num_string.substr(num_string.length - 4);
	};

	const sortEvents = (event_data) => {
		console.log(event_data);
		return event_data.sort((a, b) => a.date.substr(a.date.length - 4) > b.date.substr(b.date.length - 4));
	};

	const filterEvents = (event_data) => {
		let arr = event_data;
		for (let i = 0; i < filters.length; i++) {
			arr = arr.filter((event) => event.types.includes(filters[i]));
		}
		return arr;
	};

	return (
		<div className="timeline-component">
			<h3 className="title">{title}</h3>
			<div className="filters">
				{buttonTypes.map((button, i) => (
					<Button
						className={`${button.name} ${inlineStyles.margin}`}
						name={button.name}
						color={button.color}
						size="small"
						variant={filters.includes(button.name) ? 'contained' : 'outlined'}
						onClick={processFilterClick}
						key={i}
					>
						{button.name}
					</Button>
				))}
			</div>
			<div className="timeline-box">
				<div className="birth year">{findYear(birthday)}</div>

				<div className="events">
					<div className="timeline-line" />
					{filterEvents(sortEvents(events)).map((event, i) => (
						<Event event_data={event} key={i} index={i} buttonTypes={buttonTypes} />
					))}
				</div>
				{deathday ? (
					<div className="death year">{findYear(deathday)}</div>
				) : (
					<div className="present year">Present</div>
				)}
			</div>
		</div>
	);
}

export default Timeline;
