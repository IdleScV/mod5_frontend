import React, { useState, useEffect } from 'react';

// links
import { URL } from '../../../urlEnv';

// hooks
import { useFetch } from '../../../hooks/useFetch';

// style
import { Button } from '@material-ui/core';
import './PublishTimeline.style.css';
import CancelIcon from '@material-ui/icons/Cancel';

function PublishTimeline({ handleCloseForm, timelineId, replaceTimelineData }) {
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
				.then((json) => (handleCloseForm(), replaceTimelineData(json)));
		} else if (string === 'unpublish') {
			let method = {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: 'edit' })
			};
			fetch(URL + 'timelines/' + timelineId, method)
				.then((response) => response.json())
				.then((json) => (handleCloseForm(), replaceTimelineData(json)));
		}
	};

	return (
		<div className="publish-timeline">
			{response ? response.status === 'edit' ? (
				<div>
					<h3>This Timeline is currently Private</h3>
					<Button onClick={() => handleSubmit('publish')} variant="contained" color="primary">
						Publish
					</Button>
					<Button onClick={handleCloseForm} variant="contained" color="secondary">
						<CancelIcon />
					</Button>
				</div>
			) : response.status === 'done' ? (
				<div>
					<h3>This Timeline is currently Public</h3>
					<Button onClick={() => handleSubmit('unpublish')} variant="contained" color="primary">
						Un-Publish
					</Button>
					<Button onClick={handleCloseForm} variant="contained" color="secondary">
						<CancelIcon />
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
