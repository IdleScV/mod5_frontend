import React, { useEffect, useState } from 'react';

// components
import TimelineCard from './Cards/TimelineCard.component';

// URL
import { URL } from '../../urlEnv/index';

// css
import './AllTimelinesContainer.style.css';

function AllTimelineContainer() {
	const [ timelines, timelinesSet ] = useState(null);

	useEffect(() => {
		fetch(URL + 'timelines').then((response) => response.json()).then((json) => timelinesSet(json));
	}, []);

	return (
		<div className="browse-timeliens-page">
			<div className="all-timelines-container">
				{timelines ? timelines.map((timeline, i) => <TimelineCard data={timeline} key={i} />) : null}
			</div>
		</div>
	);
}

export default AllTimelineContainer;
