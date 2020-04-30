import { useState, useEffect } from 'react';

export const useResize = (myRef, loading) => {
	const [ dimensions, setDimensions ] = useState({ width: 0, height: 0 });

	useEffect(
		() => {
			const getDimensions = () => ({
				width: myRef.current.offsetWidth,
				height: myRef.current.offsetHeight
			});
			const handleResize = () => {
				setDimensions(getDimensions());
			};

			if (myRef.current) {
				setDimensions(getDimensions());
			}

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		},
		[ myRef, loading ]
	);

	return dimensions;
};
