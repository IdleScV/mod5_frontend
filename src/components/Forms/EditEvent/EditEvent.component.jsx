import React, { useState } from 'react';
import { FormControl, TextField, Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { URL } from '../../../urlEnv';

import './EditEvent.style.css';
function EditEvent({ event_data, firebase_id, updateEventData, showEditBoxSet, showDetailBoxSet }) {
	const {
		date,
		details,
		imageText,
		imageUrl,
		// scale,
		snippet
		//  user_id
	} = event_data;
	const [ Fdetails, FdetailsSet ] = useState(details);
	const [ Fsnippet, FsnippetSet ] = useState(snippet);
	const [ FimageUrl, FimageUrlSet ] = useState(imageUrl);
	const [ FimageText, FimageTextSet ] = useState(imageText);
	const [ Fdate, FdateSet ] = useState(date);

	const handleSubmit = () => {
		let payload = {
			details: Fdetails,
			snippet: Fsnippet,
			imageUrl: FimageUrl,
			imageText: FimageText,
			date: Fdate
		};

		fetch(URL + 'events/' + event_data.id, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		})
			.then((response) => response.json())
			.then((json) => updateEventData(json), showEditBoxSet(false));
	};

	return (
		<div className="edit-event">
			<FormControl className="form">
				<h4>Edit Event</h4>

				<TextField
					label="Snippet"
					name="snippet"
					variant="outlined"
					className="input"
					value={Fsnippet}
					onChange={(e) => {
						FsnippetSet(e.target.value);
					}}
				/>
				<TextField
					label="Details"
					name="details"
					variant="outlined"
					// disabled
					multiline
					className="input"
					value={Fdetails}
					onChange={(e) => {
						FdetailsSet(e.target.value);
					}}
				/>
				<TextField
					label="Image URL"
					name="imageUrl"
					variant="outlined"
					className="input"
					value={FimageUrl}
					onChange={(e) => {
						FimageUrlSet(e.target.value);
					}}
				/>
				<TextField
					label="Image Text"
					name="imageText"
					variant="outlined"
					className="input"
					value={FimageText ? FimageText : ''}
					onChange={(e) => {
						FimageTextSet(e.target.value);
					}}
				/>
				<TextField
					label="Date"
					name="date"
					type="date"
					variant="outlined"
					className="date"
					value={Fdate}
					onChange={(e) => {
						FdateSet(e.target.value);
					}}
				/>
				<div className="buttons">
					<Button variant="contained" className="submit" color="primary" onClick={handleSubmit}>
						Submit
					</Button>
					<Button variant="contained" className="submit" color="secondary" onClick={() => showEditBoxSet(false)}>
						<CancelIcon />
					</Button>
				</div>
			</FormControl>
		</div>
	);
}

export default EditEvent;
