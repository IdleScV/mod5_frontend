import React, { useState } from 'react';

import { Button, TextField } from '@material-ui/core';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

import { URL } from '../../../urlEnv';

import './DeleteTimeline.style.css';

function DeleteTimeline({ handleCloseForm, timelineId, removeTimeline }) {
	const [ confirm, confirmSet ] = useState(false);
	const [ textConfirm, textConfirmSet ] = useState('');
	const [ label, labelSet ] = useState("type... 'Burn it'");
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
				<div>
					<TextField
						id="standard-basic"
						value={textConfirm}
						label="type... 'Burn it'"
						onChange={(e) => textConfirmSet(e.target.value)}
					/>
					<br />
					<Button onClick={handleDelete}>
						<FireplaceIcon />
					</Button>
				</div>
			) : (
				<div>
					<div>Are you sure you want to delete this timeline?</div>
					<div>
						<Button onClick={confirmationHandle}>
							<ThumbUpAltIcon />
						</Button>
						<Button onClick={handleCloseForm}>
							<ThumbDownAltIcon />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
export default DeleteTimeline;
