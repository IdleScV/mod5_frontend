import React, { useState, useEffect } from 'react';

// links
import { URL } from '../../../urlEnv';

// hooks
import { useFetch } from '../../../hooks/useFetch';

// style
import { Button } from '@material-ui/core';
import './PublishTimeline.style.css';
import CloseIcon from '@material-ui/icons/Close';

function PublishTimeline({ handleCloseForm, timelineId }) {
	const [ response, loading, hasError ] = useFetch(URL + 'timelines/' + timelineId);

	const handleSubmit = (string) => {
		if (string === 'publish') {
			let method = {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: 'done' })
			};

			fetch(URL + 'timelines/' + timelineId, method)
				.then((response) => response.json())
				.then((json) => handleCloseForm());
		} else if (string === 'unpublish') {
			let method = {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: 'done' })
			};
			fetch(URL + 'timelines/' + timelineId, method)
				.then((response) => response.json())
				.then((json) => handleCloseForm());
		}
	};

	return (
		<div className="publish-timeline">
			{response ? response.status === 'edit' ? (
				<div>
					<h3>This Timeline is currently Private</h3>
					<Button onClick={() => handleSubmit('publish')}>Publish</Button>
					<Button onClick={handleCloseForm}>
						<CloseIcon />
					</Button>
				</div>
			) : response.status === 'done' ? (
				<div>
					<h3>This Timeline is currently Public</h3>
					<Button onClick={() => handleSubmit('unpublish')}>Un-Publish</Button>
					<Button onClick={handleCloseForm}>
						<CloseIcon />
					</Button>
				</div>
			) : loading ? (
				<div>Loading</div>
			) : hasError ? (
				<div>Has Error</div>
			) : null : null}
		</div>
	);
}
export default PublishTimeline;
