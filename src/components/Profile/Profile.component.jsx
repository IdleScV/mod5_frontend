import React, { useState, useEffect } from 'react';

// Auth
import { withAuthorization } from '../../authentication/Session';

// Links
import { URL, ROUTES } from '../../urlEnv/index';
import { Link } from 'react-router-dom';

// Components
import NewTimeline from '../Forms/NewTimeline/NewTimeline.component';
import TimelineCard from '../Containers/Cards/TimelineCard.component';
import EditTimeline from '../Forms/EditTimeline/EditTimeline.component';
import PublishTimeline from '../Forms/PublishTimeline/PublishTimeline.component';
import DeleteTimeline from '../Forms/DeleteTimeline/DeleteTimeline.component';

// style
import './Profile.style.css';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import AddBoxIcon from '@material-ui/icons/AddBox';
import PublicIcon from '@material-ui/icons/Public';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

function Profile(props) {
	const [ userData, userDataSet ] = useState([]);
	const [ timelines, timelinesSet ] = useState([]);
	const [ showEdit, showEditSet ] = useState(false);
	const [ editType, editTypeSet ] = useState(null);
	const [ chosenId, chosenIdSet ] = useState(null);
	const [ timelineData, timelineDataSet ] = useState(null);

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

			return function cleanUp() {
				props.firebase.user(props.firebase.auth.W).off();
			};
		},
		[ props.firebase ]
	);

	const handleEdit = (id, timeline) => {
		timelineDataSet(timeline);
		chosenIdSet(id);
		editTypeSet('edit');
		showEditSet(true);
	};

	const handlePublish = (id) => {
		chosenIdSet(id);
		editTypeSet('publish');
		showEditSet(true);
	};

	const handleDelete = (id) => {
		chosenIdSet(id);
		editTypeSet('delete');
		showEditSet(true);
	};

	const handleCloseForm = () => {
		showEditSet(false);
	};

	const removeTimeline = (id) => {
		timelinesSet(
			timelines.filter((obj) => {
				return obj.id !== id;
			})
		);
	};

	const replaceTimelineData = (data) => {
		timelinesSet(timelines.map((obj) => (obj.id === data.id ? data : obj)));
	};

	return (
		<div className="profile-page">
			{timelines.message ? (
				<NewTimeline />
			) : timelines ? (
				<div className="timeline-info">
					<div>
						<h2>
							<div>My Timelines </div>
							<Link to={ROUTES.CREATE}>
								<AddBoxIcon />
							</Link>
						</h2>
						{showEdit ? (
							<div className="edit-form">
								<div>
									{editType === 'edit' ? (
										<EditTimeline
											handleCloseForm={handleCloseForm}
											timelineId={chosenId}
											timelineData={timelineData}
											replaceTimelineData={replaceTimelineData}
										/>
									) : editType === 'publish' ? (
										<PublishTimeline
											handleCloseForm={handleCloseForm}
											timelineId={chosenId}
											replaceTimelineData={replaceTimelineData}
										/>
									) : (
										<DeleteTimeline
											handleCloseForm={handleCloseForm}
											timelineId={chosenId}
											removeTimeline={removeTimeline}
										/>
									)}
								</div>
							</div>
						) : null}
						<div className="timeline-container">
							{timelines ? (
								timelines.map((timeline, i) => (
									<div key={i}>
										<TimelineCard data={timeline} />
										<div className="buttons">
											<Button
												size="small"
												className="edit"
												variant="contained"
												disabled={showEdit}
												onClick={() => {
													handleEdit(timeline.id, timeline);
												}}
											>
												<EditIcon />
											</Button>
											<Button
												size="small"
												className="edit"
												variant="contained"
												color="primary"
												disabled={showEdit || userData.email === 'guest@gmail.com'}
												onClick={() => handlePublish(timeline.id)}
											>
												{timeline.status === 'edit' ? <VisibilityOffIcon /> : <PublicIcon />}
											</Button>
											<Button
												size="small"
												className="edit"
												variant="contained"
												color="secondary"
												disabled={showEdit}
												onClick={() => handleDelete(timeline.id)}
											>
												<DeleteIcon />
											</Button>
										</div>
									</div>
								))
							) : null}
						</div>
					</div>
				</div>
			) : (
				<div>Loading</div>
			)}
			<div className="user-info">
				<h2>My Info</h2>
				<div>USERNAME: {userData.username}</div>
				<div>EMAIL: {userData.email}</div>
			</div>
		</div>
	);
}

// This line of code makes sure that user is logged in or else they can't access this page
const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Profile);
