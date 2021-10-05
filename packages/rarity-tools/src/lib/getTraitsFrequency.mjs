/**
 * Normalizes traits frequency for better handling.
 */
export default function getTraitsFrequency(inputData) {
	const traitFrequency = {};

	inputData.forEach((token) => {
		const { traitsList } = token;

		Object.keys(traitsList).forEach((traitType) => {
			// initializes frequency structure for each trait type
			if (!traitFrequency[traitType]) {
				traitFrequency[traitType] = {};
			}

			const traitValue = traitsList[traitType];

			// initializes counter for each trait value
			if (!traitFrequency[traitType][traitValue]) {
				traitFrequency[traitType][traitValue] = 0;
			}

			// increments frequency
			traitFrequency[traitType][traitValue]++;
		});
	});

	return traitFrequency;
}
