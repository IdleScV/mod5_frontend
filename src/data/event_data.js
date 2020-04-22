import * as userData from './user_data';
import * as countryData from './country_data';
import * as cityData from './city_data';
import * as personData from './person_data';

// ! EXAMPLE
// EventData = {
//     user: {
//         username: "",
//         firebase_id: ""
//     },
//     reference: {type: "", instance: instance types... (Person, Country, City or null)},
//     snippet: "",
//     details:  "",
//     date: "",
//     location: Country or City instance or null,
//     types: [ 'Major', 'Personal', "Minor", "World", "Country", "City" ],
//     link:{
//         url: ""
//     },
//     image: {
//         url: "",
//         text: ""
//     }

// }

export let event_data1 = {
	user: userData.user1,
	reference: {
		type: 'Person',
		instance: personData.nikola_tesla
	},
	snippet: 'Move to the United States',
	details:
		"In June 1884, Tesla emigrated to the United States. He began working almost immediately at the Machine Works on Manhattan's Lower East Side, an overcrowded shop with a workforce of several hundred machinists, laborers, managing staff, and 20 'field engineers' struggling with the task of building the large electric utility in that city. As in Paris, Tesla was working on troubleshooting installations and improving generators. Historian W. Bernard Carlson notes Tesla may have met company founder Thomas Edison only a couple of times.",
	date: '0/07/1884',
	location: countryData.united_states,
	types: [ 'Major', 'Personal' ],
	link: {
		url: 'https://en.wikipedia.org/wiki/Nikola_Tesla#Move_to_the_United_States'
	},
	image: {
		url:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Edison_machine_works_goerck_street_new_york_1881.png/220px-Edison_machine_works_goerck_street_new_york_1881.png',
		text: 'Edison Machine Works on Goerck Street, New York.'
	}
};

export let event_data2 = {
	user: userData.user1,
	reference: {
		type: 'Person',
		instance: personData.nikola_tesla
	},
	snippet: 'Birth day',
	details:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	date: '10/07/1856',
	location: cityData.smijan,
	types: [ 'Minor', 'Personal' ],
	link: {
		url: 'https://en.wikipedia.org/wiki/Nikola_Tesla#Move_to_the_United_States'
	},
	image: {
		url:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Edison_machine_works_goerck_street_new_york_1881.png/220px-Edison_machine_works_goerck_street_new_york_1881.png',
		text: 'Edison Machine Works on Goerck Street, New York.'
	}
};

export let event_data3 = {
	user: userData.user1,
	reference: {
		type: 'World',
		instance: null
	},
	snippet: 'Lorem Ipsun',
	details:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	date: '12/10/1913',
	location: null,
	types: [ 'Minor', 'World' ],
	link: {
		url: 'https://en.wikipedia.org/wiki/Nikola_Tesla#Move_to_the_United_States'
	},
	image: {
		url:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Edison_machine_works_goerck_street_new_york_1881.png/220px-Edison_machine_works_goerck_street_new_york_1881.png',
		text: 'Edison Machine Works on Goerck Street, New York.'
	}
};

export let event_data4 = {
	user: userData.user1,
	reference: {
		type: 'Country',
		instance: countryData.united_states
	},
	snippet: 'Lorem Ipsun',
	details:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	date: '4/8/1899',
	location: countryData.united_states,
	types: [ 'Major', 'Country' ],
	link: {
		url: 'https://en.wikipedia.org/wiki/Nikola_Tesla#Move_to_the_United_States'
	},
	image: {
		url:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Edison_machine_works_goerck_street_new_york_1881.png/220px-Edison_machine_works_goerck_street_new_york_1881.png',
		text: 'Edison Machine Works on Goerck Street, New York.'
	}
};
