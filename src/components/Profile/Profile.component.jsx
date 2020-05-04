import React, { useState, useEffect } from 'react';
import { withAuthorization } from '../../authentication/Session';
import { URL } from '../../urlEnv/index';
import TimelineCard from '../Containers/Cards/TimelineCard.component';
import './Profile.style.css';
function Profile(props) {
	const [ userData, userDataSet ] = useState([]);
	const [ timelines, timelinesSet ] = useState([]);

	useEffect(
		() => {
			const fetchProfile = () => {
				fetch(URL + 'user_timelines/' + props.firebase.auth.W)
					.then((response) => response.json())
					.then((json) => timelinesSet(json));
			};
			const findUser = () => {
				props.firebase.user(props.firebase.auth.W).once('value', (snapshot) => {
					userDataSet(snapshot.val());
				});
			};
			findUser();
			fetchProfile();
		},
		[ props.firebase ]
	);

	return (
		<div className="profile-page">
			<div>
				Email: {userData.email}
				<br />
				Username: {userData.username}
			</div>
			{timelines.message ? (
				<div>{timelines.message}</div>
			) : timelines ? (
				<div className="timeline-container">
					{timelines ? timelines.map((timeline, i) => <TimelineCard data={timeline} key={i} />) : null}
				</div>
			) : (
				<div>Loading</div>
			)}
		</div>
	);
}

// This line of code makes sure that user is logged in or else they can't access this page
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Profile);
