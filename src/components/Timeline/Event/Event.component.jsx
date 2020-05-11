import React, { useState, useEffect } from 'react';

function Event({
	event_data,
	index,
	currentAge,
	ageRange,
	xAdjustment,
	filters,
	selectedEventSet,

	showDetailBoxSet
}) {
	let [ clicked, clickedSet ] = useState(false);
	let [ boxLocation, boxLocationSet ] = useState('left');
	let [ boxPercentage, boxPercentageSet ] = useState('');
	// let { image, link, location, reference, snippet, types, user } = event_data;
	// console.log(currentAge);

	let {
		date,
		details,
		id: eventId,
		imageText,
		imageUrl,
		instance_id,
		instance_type,
		link,
		location,
		scale,
		snippet,
		birth,
		sortedOrder
	} = event_data;

	let types = [ instance_type, scale ];
	// determines if event is left or right
	useEffect(
		() => {
			const figureLocation = (index_num) => {
				if (index_num % 2 === 0) {
					return 'left';
				} else {
					return 'right';
				}
			};
			boxLocationSet(figureLocation(index));
		},
		[ index ]
	);

	// Find position on chart
	useEffect(
		() => {
			const findLocationPercentage = () => {
				let percent = '';

				if (currentAge > ageRange[0] || currentAge < ageRange[1]) {
					percent = (currentAge - ageRange[0]) / (ageRange[1] - ageRange[0]) * 100;
				} else {
					percent = '';
				}

				return Math.floor(percent) + '%';
			};

			boxPercentageSet(findLocationPercentage());
		},
		[ ageRange, filters, currentAge ]
	);

	const showType = (typeArr) => {
		let colorPicker = (type_str) => {
			switch (type_str) {
				case 'Major':
					return 'secondary';
				case 'Minor':
					return 'secondary';
				case 'Personal':
					return 'primary';
				case 'World':
					return 'primary';
				case 'Country':
					return 'primary';
				case 'City':
					return 'primary';
				default:
					return 'primary';
			}
		};
		return typeArr.map((type, i) => (
			<div className="badge-item" key={i} style={{ color: 'black' }}>
				{type[0]}
			</div>
		));
	};

	return (
		// <div>Event</div>
		<div
			className={`event-box ${boxLocation} `}
			id={clicked ? 'selected' : ''}
			onClick={() => {
				clickedSet(!clicked);
				selectedEventSet(event_data);
				showDetailBoxSet(true);
			}}
			style={{ top: boxPercentage }}
		>
			{boxLocation === 'right' ? (
				<div className={`event-line ${boxLocation}`} style={{}}>
					{`${xAdjustment > 0 ? '-'.repeat(xAdjustment / 16) : ''}`}
				</div>
			) : (
				<div className={`event-line ${boxLocation}`} style={{}}>
					{`${xAdjustment > 0 ? '-'.repeat((xAdjustment - 15) / 15.8) : ''}`}
				</div>
			)}

			<div className="event-labels">
				<div className="snippet-box">{snippet}</div>
				<div className="event-right-label">
					<div className="current-age">age {Math.floor(currentAge)}</div>
					<div className="label-types">{showType(types)}</div>
				</div>
			</div>
		</div>
	);
}

export default Event;
