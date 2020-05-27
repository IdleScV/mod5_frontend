import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
function EventCard({ eventData }) {
	return (
		<div className="event-card">
			<div className="left">
				<div className="snippet">{eventData.snippet}</div>
				<div className="date">{eventData.date}</div>
			</div>
			<div className="right">
				<div className="uses">{eventData.ets.length}</div>
				<Checkbox />
			</div>
		</div>
	);
}

export default EventCard;
