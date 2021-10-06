/**
 * Flatten rarity scores for simpler exporting.
 */
export default function flattenRarityData(rarityScores) {
	if (!rarityScores) {
		displayError(`
    ERROR: Missing argument for flattening rarity data!
    `);
	}

	// initialize headers
	const headers = ["tokenId"];
	const traitTypes = Object.keys(rarityScores[0].traitsList); // DANGER: may crash if the token traits are not consistent
	traitTypes.forEach((trait) => {
		headers.push(trait, `${trait}Rarity`); // push trait twice to store name and rarity score
	});
	headers.push("totalRarity");

	// flattens rows
	const flattenedRows = rarityScores.map(
		({ tokenId, traitsList, traitsRarity, totalRarity }) => {
			const row = [tokenId];
			traitTypes.forEach((trait) => {
				row.push(traitsList[trait], traitsRarity[trait]);
			});
			row.push(totalRarity);

			return row;
		},
	);

	return [headers, ...flattenedRows];
}
