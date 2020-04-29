import * as userData from './user_data';
import * as personData from './person_data';
import * as eventData from './event_data';

// ! EXAMPLE

export let timeline_data_1 = {
	title: 'Life of Nikola Tesla',
	user: userData.user1,
	person: personData.nikola_tesla,
	// events: [ eventData.event_data1 ],
	events: [
		eventData.event_data1,
		eventData.event_data2,
		eventData.event_data3,
		eventData.event_data4,
		eventData.event_data5,
		eventData.event_data6,
		eventData.event_data7
	],
	created_at: '2020-04-22 13:36:22.459149334 +0000',
	updated_at: '2020-04-22 13:36:22.459149334 +0000'
};
