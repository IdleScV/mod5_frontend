import React, { useState, useEffect } from 'react';

function Event({ event_data, index }) {
	let [ clicked, clickedSet ] = useState(false);
	let [ boxLocation, boxLocationSet ] = useState('center');
	let { date, details, image, link, location, reference, snippet, types, user } = event_data;

	useEffect(() => {
		const figureLocation = (index_num) => {
			if (index_num % 2 == 0) {
				return 'left';
			} else {
				return 'right';
			}
		};

		boxLocationSet(figureLocation(index));
	}, []);

	const showType = (typeArr) => {
		return typeArr.map((type, i) => (
			<div className={`type ${type}`} key={i}>
				{type}
			</div>
		));
	};

	return (
		<div
			className={`event-box ${boxLocation}`}
			onClick={() => {
				clickedSet(!clicked);
			}}
			// This top style should be used to increment based on the date
			style={{ top: index * 200 + 250 }}
		>
			<div className="event-labels">
				<div className="label-date">{date}</div>
				<div className="label-types">{showType(types)}</div>
			</div>
			{!clicked ? (
				<div className="snippet-box">
					<h3>{snippet}</h3>
				</div>
			) : (
				<div className="detail-box">
					<p>{details}</p>
				</div>
			)}
		</div>
	);
}

export default Event;
