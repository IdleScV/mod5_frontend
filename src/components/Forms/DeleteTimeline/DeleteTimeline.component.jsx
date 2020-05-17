import React, { useState } from 'react';

import { Button, TextField } from '@material-ui/core';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CancelIcon from '@material-ui/icons/Cancel';

import { URL } from '../../../urlEnv';

import './DeleteTimeline.style.css';

function DeleteTimeline({ handleCloseForm, timelineId, removeTimeline }) {
	const [ confirm, confirmSet ] = useState(false);
	const [ textConfirm, textConfirmSet ] = useState('');

	const handleDelete = () => {
		if (textConfirm === 'Burn it') {
			fetch(URL + '/timelines/' + timelineId, {
				method: 'DELETE'
			}).then(removeTimeline(timelineId), handleCloseForm());
		} else {
			handleCloseForm();
		}
	};

	const confirmationHandle = () => {
		confirmSet(true);
	};

	return (
		<div className="delete-timeline">
			{confirm ? (
				<div className="confirmation">
					<TextField
						id="standard-basic"
						value={textConfirm}
						label="type... 'Burn it'"
						variant="outlined"
						onChange={(e) => textConfirmSet(e.target.value)}
					/>
					<br />
					<Button onClick={handleDelete} variant="contained" color="secondary">
						<FireplaceIcon />
					</Button>
					<Button onClick={handleCloseForm} variant="contained" color="primary">
						<CancelIcon />
					</Button>
				</div>
			) : (
				<div>
					<div className="text">Are you sure you want to delete this timeline?</div>
					<div>
						<Button onClick={confirmationHandle} variant="contained" color="primary">
							<ThumbUpAltIcon />
						</Button>
						<Button onClick={handleCloseForm} variant="contained" color="secondary">
							<ThumbDownAltIcon />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
export default DeleteTimeline;
