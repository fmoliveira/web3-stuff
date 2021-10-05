import displayError from "./displayError.mjs";

/**
 * Calculates rarity scores for all tokens.
 */
export default function calculateRarityScores(tokenData, traitsFrequency) {
	if (!tokenData || !traitsFrequency) {
		displayError(`
    ERROR: Missing arguments for calculating rarity scores!
    `);
	}

	return tokenData.map(({ tokenId, traitsList }) => {
		const traitsRarity = {};
		let totalRarity = 0;

		Object.keys(traitsList).forEach((traitType) => {
			const traitValue = traitsList[traitType];
			const traitFrequency = traitsFrequency[traitType][traitValue];
			const totalItems = traitsFrequency[traitType]._count;
			const rarityScore = calculateScore(traitFrequency, totalItems);

			traitsRarity[traitType] = rarityScore;
			totalRarity += rarityScore;
		});

		return { tokenId, traitsList, traitsRarity, totalRarity };
	});
}

/**
 * Calculates rarity score with rarity.tools method.
 *
 * Source: https://raritytools.medium.com/ranking-rarity-understanding-rarity-calculation-methods-86ceaeb9b98c
 */
function calculateScore(traitFrequency, totalItems) {
	return 1 / traitFrequency / totalItems;
}
