import React, { useState } from 'react';
import { URL } from '../../../urlEnv';

import { CountryRegionData } from 'react-country-region-selector';

import { FormControl, TextField, Button, MenuItem } from '@material-ui/core';

import './EditTimeline.style.css';

const getRegions = (country) => {
	if (!country) {
		return [];
	}
	return country[2].split('|').map((regionPair) => {
		let [
			regionName
			// regionShortCode = null
		] = regionPair.split('~');
		return regionName;
	});
};

function EditTimeline({ handleCloseForm, timelineId, timelineData, replaceTimelineData }) {
	const [ title, titleSet ] = useState(timelineData.title);
	const [ person, personSet ] = useState(timelineData.person.name);
	const [ birthday, birthdaySet ] = useState(timelineData.person.birthday);
	const [ deathday, deathdaySet ] = useState(timelineData.person.deathday);
	const [ country, countrySet ] = useState('');
	const [ region, regionSet ] = useState('');
	const [ imgURL, imgURLSet ] = useState(timelineData.picture);

	const handleSubmit = () => {
		let payload = {
			title: title,
			birthday: birthday,
			deathday: deathday,
			person: person,
			country: country ? country[0] : timelineData.person.city.country.name,
			region: region ? region : timelineData.person.city.name,
			imgURL: imgURL
		};
		console.log('Payload', payload);
		fetch(URL + 'timelines/' + timelineId, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		})
			.then((response) => response.json())
			.then((json) => replaceTimelineData(json), handleCloseForm());
	};
	return (
		<div className="newTimeline editTimeline">
			<FormControl className="edit">
				<h3>Edit Timeline</h3>
				<div className="text">
					<TextField
						label="Title"
						name="title"
						variant="outlined"
						className="input"
						value={title}
						onChange={(e) => {
							titleSet(e.target.value);
						}}
					/>
					<TextField
						label="Person"
						name="person"
						variant="outlined"
						// disabled
						className="input"
						value={person}
						onChange={(e) => {
							personSet(e.target.value);
						}}
					/>
					<TextField
						label="image URL"
						name="image URL"
						variant="outlined"
						type="url"
						className="input"
						value={imgURL}
						onChange={(e) => {
							imgURLSet(e.target.value);
						}}
					/>
					<div className="date-field">
						<TextField
							id="date"
							type="date"
							value={birthday}
							className="input date"
							helperText="Birthday"
							InputLabelProps={{
								shrink: true
							}}
							onChange={(e) => {
								birthdaySet(e.target.value);
							}}
						/>
						<TextField
							id="date"
							name="deathday"
							type="date"
							value={deathday ? deathday : ''}
							className="input date"
							helperText="Death day (optional)"
							InputLabelProps={{
								shrink: true
							}}
							onChange={(e) => {
								deathdaySet(e.target.value);
							}}
						/>
					</div>
				</div>
				<div className="location">
					<h5>Birth Place</h5>
					<form className="countryRegion">
						<TextField
							id="country"
							label="Country"
							value={country ? country : timelineData.person.city.country.name}
							select
							placeholder={timelineData.person.city.country.name}
							onChange={(e) => countrySet(e.target.value)}
						>
							<MenuItem value={timelineData.person.city.country.name} disabled>
								{timelineData.person.city.country.name}
							</MenuItem>
							{CountryRegionData.map((option, index) => (
								<MenuItem key={option[0]} value={option}>
									{option[0]}
								</MenuItem>
							))}
						</TextField>
						<br />
						<TextField
							id="region"
							label="Region"
							value={region ? region : timelineData.person.city.name}
							select
							placeholder={timelineData.person.city.name}
							onChange={(e) => {
								regionSet(e.target.value);
							}}
						>
							<MenuItem value={timelineData.person.city.name} disabled>
								{timelineData.person.city.name}
							</MenuItem>
							{getRegions(country).map((option, index) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
					</form>
				</div>
				<div>
					<Button
						style={{ margin: '5px' }}
						onClick={handleSubmit}
						disabled={title === '' || person === '' || birthday === '0000-00-00'}
						variant="contained"
						color="primary"
					>
						Submit
					</Button>
					<Button style={{ margin: '5px' }} onClick={handleCloseForm} variant="contained" color="secondary">
						Cancel
					</Button>
				</div>
			</FormControl>
		</div>
	);
}

export default EditTimeline;
