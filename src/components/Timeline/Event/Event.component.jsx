import React, { useState, useEffect } from 'react';
import Badge from '@material-ui/core/Badge';

function Event({ event_data, index, buttonTypes, currentAge }) {
	let [ clicked, clickedSet ] = useState(false);
	let [ boxLocation, boxLocationSet ] = useState('center');
	let { date, details, image, link, location, reference, snippet, types, user, sortedOrder } = event_data;

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

	const showType = (typeArr) => {
		let colorPicker = (type_str) => {
			switch (type_str) {
				case 'Major':
					return 'primary';
				case 'Minor':
					return 'primary';
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
			<div className="badge-item" key={i}>
				<Badge badgeContent={type[0]} color={colorPicker(type)} key={i} />
			</div>
		));
	};

	return (
		<div
			className={`event-box ${boxLocation} `}
			id={clicked ? 'selected' : ''}
			onClick={() => {
				clickedSet(!clicked);
			}}
			// This top style should be used to increment based on the date
			style={{ top: index * 200 + 250 }}
		>
			{!clicked ? (
				<div className="event-labels">
					<div className="snippet-box">{snippet}</div>
					<div className="current-age">{currentAge} Y </div>
					<div className="label-types">{showType(types)}</div>
				</div>
			) : (
				<div className="detail-box">
					<div className="detail-age">{currentAge} Years Old </div>
					<div className="detail-types">{showType(types)}</div>
					<p>{details}</p>
				</div>
			)}
		</div>
	);
}

export default Event;
