/**
 * Normalizes traits frequency for better handling.
 */
export default function getTraitsFrequency(inputData) {
	const traitFrequency = {};

	inputData.forEach((token) => {
		const [tokenId] = Object.keys(token);
		const tokenData = token[tokenId];
		const traitList = Object.keys(tokenData);

		traitList.forEach((traitName) => {
			// initializes frequency structure for each trait type
			if (!traitFrequency[traitName]) {
				traitFrequency[traitName] = {};
			}

			const traitValue = tokenData[traitName];

			// initializes counter for each trait value
			if (!traitFrequency[traitName][traitValue]) {
				traitFrequency[traitName][traitValue] = 0;
			}

			// increments frequency
			traitFrequency[traitName][traitValue]++;
		});
	});

	return traitFrequency;
}
