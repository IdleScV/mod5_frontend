import React, { useState } from 'react';
import { FormControl, TextField, Button } from '@material-ui/core';

import { URL } from '../../../urlEnv';

function NewTimeline() {
	const [ title, titleSet ] = useState('');
	const [ person, personSet ] = useState('');
	const [ birthday, birthdaySet ] = useState('2020-04-20');
	const [ deathday, deathdaySet ] = useState('0000-00-00');

	const handleSubmit = () => {
		let payload = {
			title: title,
			person: person,
			birthday: birthday,
			deathday: deathday
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
				<Button onClick={handleSubmit} variant="contained" color="secondary">
					Submit
				</Button>
			</FormControl>
		</div>
	);
}

export default NewTimeline;
