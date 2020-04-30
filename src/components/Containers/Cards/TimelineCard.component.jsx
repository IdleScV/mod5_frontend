import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TimelineCard({ data }) {
	const [ detail, detailSet ] = useState(false);
	const { title, id, person: { name: person }, user: { username: creator }, picture } = data;

	return (
		<div className="timeline-card-frame">
			<Link to={`/timeline/${id}`} style={{ textDecoration: 'none' }}>
				<div
					className={`timeline-card ${detail ? 'slowzoom' : null}`}
					onMouseEnter={() => detailSet(true)}
					onMouseLeave={() => detailSet(false)}
					style={{ backgroundImage: `url(${picture})` }}
				>
					{detail ? (
						<div className="text">
							<h3>{title}</h3>
							<h5>{person}</h5>
						</div>
					) : null}
				</div>
			</Link>
		</div>
	);
}

export default TimelineCard;
