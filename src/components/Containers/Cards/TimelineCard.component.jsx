import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './TimelineCard.style.css';

function TimelineCard({ data }) {
	const [ detail, detailSet ] = useState(false);
	const { title, id, person: { name: person }, user: { username: creator }, picture } = data;

	return (
		<div className="timeline-card-frame">
			<Link
				to={`/timeline/${id}`}
				style={{ textDecoration: 'none' }}
				onMouseEnter={() => detailSet(true)}
				onMouseLeave={() => detailSet(false)}
			>
				<div className="text">
					<h3>{title}</h3>
					<h5>{person}</h5>
				</div>
				<div
					className={`timeline-card ${detail ? 'slowzoom' : null}`}
					style={{ backgroundImage: `url(${picture})` }}
				/>
			</Link>
		</div>
	);
}

export default TimelineCard;
