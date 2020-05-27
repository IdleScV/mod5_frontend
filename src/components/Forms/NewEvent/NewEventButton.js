import React, { useState } from 'react';

// Component
import CountryRegionMUISelectors from '../Selector/CountryRegionMUISelectors.component';
import EventsCollection from '../../Containers/Events/EventsCollection.component';

// Links
import { URL } from '../../../urlEnv';

// style
import { Button, FormControl, TextField, Select, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import './NewEventButton.style.css';

function NewEventButton({ maker_id, firebase_id, events, eventDataSet, eventData, timelineId }) {
	const [ showForm, showFormSet ] = useState(false);
	const [ snippet, snippetSet ] = useState('');
	const [ details, detailsSet ] = useState('');
	const [ scale, scaleSet ] = useState('Scale');
	const [ type, typeSet ] = useState('Type');
	const [ eventDate, eventDateSet ] = useState('00-00-0000');
	const [ country, countrySet ] = useState('');
	const [ region, regionSet ] = useState('');
	const [ picLink, picLinkSet ] = useState('');
	let [ nonPersonalEvents, nonPersonalEventsSet ] = useState(false);
	// Add Event
	const handleAddEvent = () => {
		showFormSet(true);
		if (!eventData) {
			eventDataSet(events);
		}
	};

	const handleClose = () => {
		showFormSet(false);
	};

	const handleSubmit = () => {
		let payload = {
			firebase_id: firebase_id,
			snippet: snippet,
			details: details,
			scale: scale,
			type: type,
			country: country,
			region: region,
			date: eventDate,
			imageUrl: picLink,
			timeline_id: timelineId
		};
		fetch(URL + 'events', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		})
			.then((response) => response.json())
			.then((json) => eventDataSet(eventData.concat(json)), resetForm());
	};

	const resetForm = () => {
		return (
			showFormSet(false),
			snippetSet(''),
			detailsSet(''),
			scaleSet('Scale'),
			typeSet('Type'),
			eventDateSet('00-00-0000'),
			countrySet(''),
			regionSet(''),
			picLinkSet('')
		);
	};

	if (maker_id !== firebase_id) {
		return <div />;
	}
	if (showForm) {
		return (
			<div className="add-event-page">
				<Button color="primary" onClick={handleClose}>
					<ClearIcon />
				</Button>
				<div className="add-event-form">
					<FormControl>
						<div>
							Add an Event
							<div>
								<Button
									onClick={() => {
										nonPersonalEventsSet(!nonPersonalEvents);
									}}
								>
									{nonPersonalEvents ? 'Close Browser' : 'Browse Event Library'}
								</Button>
								{nonPersonalEvents ? <EventsCollection /> : null}
							</div>
						</div>

						<TextField
							label="Title"
							name="snippet"
							variant="outlined"
							value={snippet}
							onChange={(e) => {
								snippetSet(e.target.value);
							}}
						/>
						<div className="type">
							<FormControl>
								<Select label="Scale" value={scale} onChange={(e) => scaleSet(e.target.value)}>
									<MenuItem aria-label="None" disabled value="Scale">
										Scale
									</MenuItem>
									<MenuItem value={'Major'}>Major</MenuItem>
									<MenuItem value={'Minor'}>Minor</MenuItem>
								</Select>
							</FormControl>
							<FormControl>
								<Select label="Type" value={type} onChange={(e) => typeSet(e.target.value)}>
									<MenuItem aria-label="None" disabled value="Type">
										Type
									</MenuItem>
									<MenuItem value={'Personal'}>Personal</MenuItem>
									<MenuItem value={'World'}>World</MenuItem>
									<MenuItem value={'Country'}>Country</MenuItem>
									<MenuItem value={'Region'}>Region</MenuItem>
								</Select>
							</FormControl>

							<TextField
								id="date"
								type="date"
								value={eventDate}
								onChange={(e) => {
									eventDateSet(e.target.value);
								}}
							/>
						</div>
						<CountryRegionMUISelectors
							handleCountry={countrySet}
							handleRegion={regionSet}
							country={country}
							region={region}
							specs={type}
						/>
						<TextField
							className="details"
							label="Details"
							name="details"
							variant="outlined"
							multiline
							rows={4}
							value={details}
							onChange={(e) => {
								detailsSet(e.target.value);
							}}
						/>
						<TextField
							label="picture location URL (optional)"
							id="picLink"
							type="link"
							value={picLink}
							onChange={(e) => {
								picLinkSet(e.target.value);
							}}
						/>

						<Button
							onClick={handleSubmit}
							disabled={
								!snippet || scale === 'Scale' || type === 'Type' || !details || eventDate === '00-00-0000'
							}
						>
							Add
						</Button>
					</FormControl>
				</div>
			</div>
		);
	} else {
		return (
			<div className="add-event-page">
				<Button color="primary" onClick={handleAddEvent}>
					<AddIcon />
				</Button>
			</div>
		);
	}
}

export default NewEventButton;
