import React, { useState } from 'react';
// Components
import Event from './Event/Event.component';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
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
	let [ ageRange, ageRangeSet ] = useState([ 0, 100 ]);

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

	const marks = [
		{
			value: 0,
			label: '0'
		},
		{
			value: 20,
			label: '20'
		},
		{
			value: 40,
			label: '40'
		},
		{
			value: 60,
			label: '60'
		},
		{
			value: 80,
			label: '80'
		},
		{
			value: 100,
			label: '100'
		}
	];

	// Sort events + filter events
	const sortEvents = (event_data) => {
		let sorted = event_data.sort((a, b) => a.date.substr(a.date.length - 4) > b.date.substr(b.date.length - 4));
		return sorted.map((event, i) => ({ ...event, sortedOrder: i }));
	};
	const processFilterClick = (e) => {
		let value = e.currentTarget.name;
		if (filters.includes(value)) {
			filtersSet(filters.filter((item) => item !== value));
		} else {
			filtersSet(filters.concat(value));
		}
	};
	const filterEventsByCategory = (event_data) => {
		let arr = event_data;
		for (let i = 0; i < filters.length; i++) {
			arr = arr.filter((event) => event.types.includes(filters[i]));
		}
		return arr;
	};
	// Converts date data to just year
	const findYear = (num_string) => {
		return num_string.substr(num_string.length - 4);
	};

	const currentAge = (event) => {
		return findYear(event.date) - findYear(birthday);
	};

	const filterEventsByAge = (event_data) => {
		return event_data.filter((event) => currentAge(event) >= ageRange[0] && currentAge(event) <= ageRange[1]);
	};

	// Slider functions
	const handleSlider = (e, newValue) => {
		if (newValue[1] - newValue[0] >= 10 && newValue != ageRange) {
			ageRangeSet(newValue);
		}
	};
	const deathAge = () => {
		return findYear(deathday) - findYear(birthday);
	};
	const roundUpTen = (num) => {
		return Math.ceil((num + 1) / 10) * 10;
	};
	const maxRange = roundUpTen(deathAge());

	console.log(filterEventsByAge(sortEvents(events)));
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

				<Slider
					defaultValue={[ 0, 80 ]}
					value={ageRange}
					onChange={handleSlider}
					valueLabelDisplay="off"
					aria-labelledby="range-slider"
					step={10}
					marks={marks.slice(0, roundUpTen(deathAge()) / 20 + 2).concat({
						value: deathAge(),
						label: 'Death'
					})}
					min={0}
					max={maxRange + 10}
				/>
			</div>
			<div className="timeline-box">
				<div className="birth year">{parseInt(findYear(birthday)) + ageRange[0]}</div>

				<div className="events">
					<div className="timeline-line" />
					{filterEventsByAge(filterEventsByCategory(sortEvents(events))).map((event, i) => (
						<Event
							event_data={event}
							key={i}
							index={i}
							currentAge={findYear(event.date) - findYear(birthday)}
							birthyear={findYear(birthday)}
							buttonTypes={buttonTypes}
						/>
					))}
				</div>
				{deathday ? (
					// <div className="death year">{findYear(deathday)}</div>
					<div className="death year">{parseInt(findYear(birthday)) + ageRange[1]}</div>
				) : (
					<div className="present year">Present</div>
				)}
			</div>
		</div>
	);
}

export default Timeline;
