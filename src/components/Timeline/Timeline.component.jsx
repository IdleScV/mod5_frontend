import React from 'react';

import { timelineData } from '../../data/index';

function Timeline() {
	let { timeline_data_1 } = timelineData;

	let {
		events,
		title,
		user: { username, firebase_id },
		person: {
			birthday,
			deathday,
			name,
			initial_state: { age, location: { name: birth_city, country: { name: birth_country } } }
		}
	} = timeline_data_1;
	console.log('=======================Timeline Information Bellow=====================================');
	console.log('Title:', title);
	console.log('Created By:', username, '| Firebase ID:', firebase_id);
	console.log('Name:', name, '| initial age:', age);
	console.log('Birthday:', birthday, '| Deathday:', deathday, `| Birth place: ${birth_city}, ${birth_country}`);
	console.log('Events', events);

	return <div>Words</div>;
}

export default Timeline;
