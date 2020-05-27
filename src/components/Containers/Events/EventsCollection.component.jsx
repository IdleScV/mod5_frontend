import React from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { URL } from '../../../urlEnv';

import EventCard from '../Cards/EventCard.component';

import { AppBar } from '@material-ui/core';

import './EventsCollection.style.css';

function EventsCollection() {
	const [ response, loading, hasError ] = useFetch(URL + 'events');

	console.log('response', response);
	console.log('loading', loading);
	console.log('hasError', hasError);

	return (
		<div className="events-collection">
			<AppBar className="filters" position="sticky">
				Filters
			</AppBar>
			{loading ? (
				'Loading'
			) : hasError ? (
				'Error Loading'
			) : response ? (
				<div className="events">
					{response.sort((a, b) => a.ets.length > b.ets.length).map((x, i) => <EventCard eventData={x} key={i} />)}
				</div>
			) : null}
		</div>
	);
}

export default EventsCollection;
