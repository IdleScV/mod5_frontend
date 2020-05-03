import React, { useState, useEffect } from 'react';
import { AuthUserContext, withAuthorization } from '../../authentication/Session';
function Profile(props) {
	const [ userData, userDataSet ] = useState([]);

	props.firebase.user(props.firebase.auth.W).once('value', (snapshot) => {
		userDataSet(snapshot.val());
	});

	const fetchUserTimelines = () => {
		console.log('Fetching Timelines');
	};

	return (
		<div>
			<h2>This is the Profile page</h2>

			<div>
				Email: {userData.email}
				<br />
				Username: {userData.username}
			</div>
			<div>Should list all of this person's timelines & events theyve created</div>
		</div>
	);
}

// This line of code makes sure that user is logged in or else they can't access this page
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Profile);
