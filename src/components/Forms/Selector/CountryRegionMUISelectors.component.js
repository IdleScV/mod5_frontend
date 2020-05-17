import React from 'react';

import { CountryRegionData } from 'react-country-region-selector';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import './CountryRegionMUISelectors.style.css';

const getRegions = (country) => {
	if (!country) {
		return [];
	}
	return country[2].split('|').map((regionPair) => {
		let [
			regionName
			// regionShortCode = null
		] = regionPair.split('~');
		return regionName;
	});
};

function CountryRegionMUISelectors(props) {
	return (
		<form className="countryRegion">
			<TextField
				id="country"
				label="Country"
				value={props.country}
				select
				disabled={props.specs ? props.specs === 'World' : false}
				onChange={(e) => props.handleCountry(e.target.value)}
			>
				{CountryRegionData.map((option, index) => (
					<MenuItem key={option[0]} value={option}>
						{option[0]}
					</MenuItem>
				))}
			</TextField>
			<br />
			<TextField
				id="region"
				label="Region"
				value={props.region}
				select
				disabled={props.specs ? props.specs === 'Country' || props.specs === 'World' : false}
				onChange={(e) => {
					props.handleRegion(e.target.value);
				}}
			>
				{getRegions(props.country).map((option, index) => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
			</TextField>
		</form>
	);
}

export default CountryRegionMUISelectors;
