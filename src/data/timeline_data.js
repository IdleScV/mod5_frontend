import * as userData from './user_data';
import * as personData from './person_data';
import * as eventData from './event_data';

// ! EXAMPLE
// let blank_timeline_data = {
// 	title: '',
// 	user: {
// 		username: ' ',
// 		firebase_id: ' '
// 	},
// 	Person: {
// 		name: '',
// 		birthday: '',
// 		deathday: '',
// 		initial_state: { location: birth_location, age: 0 },
// 		parents: [ '', '' ],
// 		partner: ''
// 	},
// 	events: [ event_instances ],
// 	created: '',
// 	updated: ''
// };

export let timeline_data_1 = {
	title: 'Life of Nikola Tesla',
	user: userData.user1,
	person: personData.nikola_tesla,
	// events: [ eventData.event_data1 ],
	events: [ eventData.event_data1, eventData.event_data2, eventData.event_data3, eventData.event_data4 ],
	created_at: '2020-04-22 13:36:22.459149334 +0000',
	updated_at: '2020-04-22 13:36:22.459149334 +0000'
};
