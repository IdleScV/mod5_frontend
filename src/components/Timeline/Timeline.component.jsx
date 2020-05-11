import React, { useState, useRef } from 'react';
// Components
import Event from './Event/Event.component';
import ErrorPage from '../ErrorPage/ErrorPage.component';
import NewEventButton from '../Forms/NewEvent/NewEventButton';
import EditEvent from '../Forms/EditEvent/EditEvent.component';

// Hook
import { useResize } from '../../hooks/windowSize';
import { useFetch } from '../../hooks/useFetch';

// Auth
import { withAuthorization } from '../../authentication/Session';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { Button, Slider } from '@material-ui/core';
import './Timeline.style.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
//URL
import { URL } from '../../urlEnv/index';

// React Dom
import { useHistory } from 'react-router-dom';

// for inline styling
const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(0.5)
	}
}));

function Timeline(props) {
	// current date
	let d = new Date();
	// React Router Hook
	const history = useHistory();
	// Fetch Hook
	const [ response, loading, hasError ] = useFetch(URL + 'timelines/' + props.match.params.id);

	// State
	let [ filters, filtersSet ] = useState([]);
	let [ ageRange, ageRangeSet ] = useState([ 0, null ]);
	let [ eventData, eventDataSet ] = useState(null);
	let [ selectedEvent, selectedEventSet ] = useState(null);
	let [ showDetailBox, showDetailBoxSet ] = useState(false);
	let [ showEditBox, showEditBoxSet ] = useState(false);
	let [ deleteConfirm, deleteConfirmSet ] = useState(false);

	// TEMPORARY LIKE STATE
	let [ like, likeSet ] = useState(false);

	// Style Hook
	const inlineStyles = useStyles();

	// Window size Hook
	const componentRef = useRef();
	const { width } = useResize(componentRef, loading);

	// response filter
	if (loading) {
		return <div ref={componentRef}>Loading</div>;
	}
	if (hasError) {
		return <div ref={componentRef}>Has Error</div>;
	}

	if (response !== false && response !== null && response.status !== 404) {
		const { title, picture, person, events, user, status, id: timelineId, person_id, user_id } = response;
		const { username } = user;

		const { birthday, deathday } = person;

		// Button Color
		const buttonTypes = [
			{ name: 'Major', color: 'secondary' },
			{ name: 'Minor', color: 'secondary' },
			{ name: 'Personal', color: 'primary' },
			{ name: 'World', color: 'primary' },
			{ name: 'Country', color: 'primary' },
			{ name: 'City', color: 'primary' }
		];

		// Sort events + filter events
		const sortEvents = (event_data) => {
			let sorted = event_data.sort((a, b) => findYear(a.date) > findYear(b.date));
			return sorted.map((event, i) => ({ ...event, sortedOrder: i }));
		};
		const processFilterClick = (e) => {
			let value = e.currentTarget.name;
			if (value === 'Major' && filters.includes('Minor')) {
				filtersSet(filters.filter((item) => item !== 'Minor').concat(value));
			} else if (value === 'Minor' && filters.includes('Major')) {
				filtersSet(filters.filter((item) => item !== 'Major').concat(value));
			} else if (filters.includes(value)) {
				filtersSet(filters.filter((item) => item !== value));
			} else {
				filtersSet(filters.concat(value));
			}
		};
		const filterEventsByCategory = (event_data) => {
			let arr = event_data;
			for (let i = 0; i < filters.length; i++) {
				arr = arr.filter((event) => ![ event.instance_type, event.scale ].includes(filters[i]));
			}
			return arr;
		};

		// Converts date data to just year
		const findYear = (num_string) => {
			return num_string.split('-')[0];
		};

		const currentAge = (event) => {
			return findYear(event.date) - findYear(birthday);
		};
		const filterEventsByAge = (event_data) => {
			if (ageRange[1]) {
				return event_data.filter((event) => currentAge(event) >= ageRange[0] && currentAge(event) <= ageRange[1]);
			} else {
				return event_data;
			}
		};

		const handleSlider = (e, newValue) => {
			// Set min difference to 5
			if (newValue[1] - newValue[0] >= 1 && newValue !== ageRange) {
				ageRangeSet(newValue);
			}
		};
		const deathAge = () => {
			return findYear(deathday) - findYear(birthday);
		};

		const currentAgeToDate = () => {
			return d.getFullYear() - findYear(birthday);
		};
		const roundUpTen = (num) => {
			return Math.ceil((num + 1) / 10) * 10;
		};

		// Line-Marker
		const lineMarkers = () => {
			let distance = '';
			ageRange[1]
				? (distance = ageRange[1] - ageRange[0])
				: deathday ? (distance = deathAge() - ageRange[0]) : (distance = currentAgeToDate() - ageRange[0]);

			let eqDistance = distance / 10;
			let arr = [];
			for (let i = 1; i < 10; i++) {
				// arr.push((eqDistance * i).toFixed(1));

				arr.push(eqDistance * i);
			}

			let currentRange = ageRange[1] - ageRange[0];
			let markers = arr.map((num) => Math.floor(num + parseInt(findYear(birthday)) + ageRange[0]).toString());
			let uniqueMarkers = [ ...new Set(markers) ];

			if (distance >= 10) {
				return uniqueMarkers;
			} else {
				uniqueMarkers.shift();
				return uniqueMarkers;
			}
		};

		// Edit Event
		const handleEdit = () => {
			showEditBoxSet(true);
		};

		// Delete Event
		const handleDelete = (event_id) => {
			const deleteEvent = (eventId) => {
				if (eventData) {
					eventDataSet(eventData.filter((event) => event.id !== eventId));
				} else {
					eventDataSet(events.filter((event) => event.id !== eventId));
				}
			};

			fetch(URL + 'ets/' + timelineId, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ eventId: event_id })
			})
				.then((res) => res.json())
				.then((json) => deleteEvent(event_id), showDetailBoxSet(false));
		};

		// update Event
		const updateEventData = (data) => {
			if (eventData) {
				eventDataSet(eventData.map((event) => (event.id === data.id ? data : event)));
			} else {
				eventDataSet(events.map((event) => (event.id === data.id ? data : event)));
			}
			selectedEventSet(data);
		};

		// find date as percentage of year
		const findDatePercent = (date) => {
			let month = date.split('-')[1];
			let day = date.split('-')[2];
			let greater = month / 12;

			let lesser = day / 365;

			return greater + lesser;
		};

		return (
			<div className="timeline-component" ref={componentRef}>
				<div className="header">
					<Button color="primary" onClick={() => history.goBack()}>
						<ArrowBackIcon />
					</Button>

					<h2 className="title">{title}</h2>
					<div className="header-item">
						<NewEventButton
							maker_id={user.firebase_id}
							firebase_id={props.firebase.auth.W}
							events={events}
							eventData={eventData}
							eventDataSet={eventDataSet}
							timelineId={timelineId}
						/>

						<div className="author">Made by: {username}</div>
					</div>
				</div>
				<div className="filters">
					{buttonTypes.map((button, i) => (
						<Button
							className={`${button.name} ${inlineStyles.margin}`}
							name={button.name}
							color={button.color}
							size="small"
							variant={filters.includes(button.name) ? 'outlined' : 'contained'}
							onClick={processFilterClick}
							key={i}
						>
							{button.name}
						</Button>
					))}

					<Slider
						defaultValue={[ 0, deathday ? deathAge() : currentAgeToDate() ]}
						value={ageRange[1] ? ageRange : deathday ? [ 0, deathAge() ] : [ 0, currentAgeToDate() ]}
						onChange={handleSlider}
						aria-labelledby="range-slider"
						step={1}
						min={0}
						max={deathday ? deathAge() : currentAgeToDate()}
						valueLabelDisplay="auto"
					/>
				</div>
				{showDetailBox ? (
					<div className="description-box">
						<div className="header">
							<Button
								onClick={() => {
									likeSet(!like);
								}}
							>
								{like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
							</Button>
							<h3>{selectedEvent.snippet}</h3>

							<Button>
								<CloseIcon
									onClick={() => {
										showDetailBoxSet(false);
										likeSet(false);
									}}
								/>
							</Button>
						</div>
						<div className="text">{selectedEvent.details}</div>
						{selectedEvent.imageUrl ? (
							<div>
								<img
									className="detail-image"
									src={selectedEvent.imageUrl}
									alt={selectedEvent.imageText ? selectedEvent.imageText : ''}
								/>
								{selectedEvent.imageText ? <p className="image-details">{selectedEvent.imageText}</p> : null}
							</div>
						) : null}
						{showEditBox ? (
							<EditEvent
								event_data={selectedEvent}
								firebase_id={props.firebase.auth.W}
								updateEventData={updateEventData}
								showEditBoxSet={showEditBoxSet}
								showDetailBoxSet={showDetailBoxSet}
							/>
						) : null}
						{props.firebase.auth.W === user.firebase_id ? (
							<div className="edit-button">
								<Button onClick={handleEdit}>
									<EditIcon />
								</Button>
								<Button onClick={() => deleteConfirmSet(true)}>
									<DeleteIcon />
								</Button>
								{deleteConfirm ? (
									<div>
										<div>Are you Sure?</div>
										<Button
											onClick={() => {
												handleDelete(selectedEvent.id);
												deleteConfirmSet(false);
											}}
										>
											<CheckIcon />
										</Button>
										<Button
											onClick={() => {
												deleteConfirmSet(false);
											}}
										>
											<NotInterestedIcon />
										</Button>
									</div>
								) : null}
							</div>
						) : null}
						<div className="date">{selectedEvent.date}</div>
					</div>
				) : null}
				<div className="timeline-box">
					<div className="birth year">{parseInt(findYear(birthday)) + ageRange[0]}</div>

					<div className="events">
						<div className="timeline-line">
							{lineMarkers() ? (
								lineMarkers().map((marker, i) => <div className="timeline-markers" key={i}>{`${marker}`}</div>)
							) : (
								<div className="timeline-markers">Halfway</div>
							)}
						</div>
						<div className="event-container">
							{filterEventsByAge(
								filterEventsByCategory(sortEvents(eventData ? eventData : events))
							).map((event, i) => (
								// {filterEventsByAge(sortEvents(events)).map((event, i) => (
								<Event
									event_data={event}
									key={i}
									index={i}
									currentAge={findYear(event.date) - findYear(birthday) + findDatePercent(event.date)}
									birthyear={findYear(birthday)}
									ageRange={ageRange[1] ? ageRange : deathday ? [ 0, deathAge() ] : [ 0, currentAgeToDate() ]}
									xAdjustment={width - 665}
									filters={filters}
									selectedEventSet={selectedEventSet}
									showDetailBoxSet={showDetailBoxSet}
									birthday={birthday}
								/>
							))}
						</div>
					</div>

					<div className="death year">
						{parseInt(findYear(birthday)) +
							(ageRange[1] ? ageRange[1] : deathday ? deathAge() : currentAgeToDate())}
					</div>
				</div>
			</div>
		);
	} else {
		return <ErrorPage response={response} />;
	}
}

// export default Timeline;

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Timeline);
