import React, { useState, useEffect } from 'react';
import { FormControl, TextField, Button } from '@material-ui/core';
import { withAuthorization } from '../../../authentication/Session';
import { URL } from '../../../urlEnv';
import CountryRegionMUISelectors from '../Selector/CountryRegionMUISelectors.component.js';

import './NewTimeline.style.css';

const initialState = {
	birthday: '0000-00-00'
};

function NewTimeline(props) {
	const [ title, titleSet ] = useState('');
	const [ person, personSet ] = useState('');
	const [ birthday, birthdaySet ] = useState(initialState.birthday);
	const [ deathday, deathdaySet ] = useState('');
	const [ userData, userDataSet ] = useState([]);
	const [ country, countrySet ] = useState('');
	const [ region, regionSet ] = useState('');
	const [ imageURL, imageURLSet ] = useState('');

	useEffect(
		() => {
			const getUserData = () => {
				props.firebase.user(props.firebase.auth.W).once('value', (snapshot) => {
					userDataSet(snapshot.val());
				});
			};
			getUserData();

			return function cleanUp() {
				props.firebase.user(props.firebase.auth.W).off();
			};
		},
		[ props.firebase ]
	);

	const handleSubmit = () => {
		let payload = {
			title: title,
			person: person,
			birthday: birthday,
			deathday: deathday,
			firebase_id: props.firebase.auth.W,
			username: userData.username,
			country: country[0],
			region: region,
			imageURL: imageURL
		};

		fetch(URL + 'timelines', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		})
			.then((response) => response.json())
			.then((timeline) => props.history.push(`timeline/${timeline.id}`));
	};

	return (
		<div className="newTimeline">
			<h2>Make a New Timeline</h2>
			<h4>{userData.email === 'guest@gmail.com' ? "As a guest, your timelines can't be published" : null}</h4>
			<FormControl>
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
						className="input"
						value={person}
						onChange={(e) => {
							personSet(e.target.value);
						}}
					/>
					<TextField
						label="Picture (image URL)"
						name="image URL"
						variant="outlined"
						type="url"
						className="input"
						value={imageURL}
						onChange={(e) => {
							imageURLSet(e.target.value);
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
							value={deathday}
							className="input date"
							helperText="End date (optional)"
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
					<CountryRegionMUISelectors
						handleCountry={countrySet}
						handleRegion={regionSet}
						country={country}
						region={region}
					/>
				</div>
				<Button
					onClick={handleSubmit}
					disabled={title === '' || person === '' || birthday === initialState.birthday || region === ''}
					variant="contained"
					color="primary"
				>
					Submit
				</Button>
			</FormControl>
		</div>
	);
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(NewTimeline);
