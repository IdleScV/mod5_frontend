import React, { useState } from 'react';
import { FormControl, TextField, Button, Select } from '@material-ui/core';
import { withAuthorization } from '../../../authentication/Session';
import { URL } from '../../../urlEnv';
import CountryRegionMUISelectors from '../Selector/CountryRegionMUISelectors.component.js';

function NewTimeline(props) {
	const [ title, titleSet ] = useState('');
	const [ person, personSet ] = useState('');
	const [ birthday, birthdaySet ] = useState('2020-04-20');
	const [ deathday, deathdaySet ] = useState('');
	const [ userData, userDataSet ] = useState([]);
	const [ country, countrySet ] = useState('');
	const [ region, regionSet ] = useState('');

	props.firebase.user(props.firebase.auth.W).once('value', (snapshot) => {
		userDataSet(snapshot.val());
	});

	const handleSubmit = () => {
		let payload = {
			title: title,
			person: person,
			birthday: birthday,
			deathday: deathday,
			firebase_id: props.firebase.auth.W,
			username: userData.username,
			country: country[0],
			region: region
		};

		fetch(URL + 'timelines', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		})
			.then((response) => response.json())
			.then((json) => console.log(json));
	};

	return (
		<div>
			<h2>Make a New Timeline</h2>
			<FormControl>
				<TextField
					id="filled-basic"
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
					id="filled-basic"
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
					id="date"
					label="Birth day"
					type="date"
					value={birthday}
					className="input date"
					InputLabelProps={{
						shrink: true
					}}
					onChange={(e) => {
						birthdaySet(e.target.value);
					}}
				/>
				<TextField
					id="date"
					label="Death day (optional)"
					name="deathday"
					type="date"
					value={deathday}
					className="input date"
					InputLabelProps={{
						shrink: true
					}}
					onChange={(e) => {
						deathdaySet(e.target.value);
					}}
				/>

				<CountryRegionMUISelectors
					handleCountry={countrySet}
					handleRegion={regionSet}
					country={country}
					region={region}
				/>
				<Button onClick={handleSubmit} variant="contained" color="secondary">
					Submit
				</Button>
			</FormControl>
		</div>
	);
}

// makes sure user is logged in for page access
const authCondition = (authUser) => !!authUser;
// provides firebase props
export default withAuthorization(authCondition)(NewTimeline);
