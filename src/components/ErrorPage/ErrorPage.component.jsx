import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage({ response }) {
	return (
		<div>
			<h1>{response ? response.status : null} ERROR</h1>
			<Link to="/">Home</Link>
		</div>
	);
}

export default ErrorPage;
