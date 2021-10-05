import getFileData from "./lib/getFileData.mjs";
import getTokenData from "./lib/getTokenData.mjs";
import getTraitsFrequency from "./lib/getTraitsFrequency.mjs";
import calculateRarityScores from "./lib/calculateRarityScores.mjs";
import flattenRarityData from "./lib/flattenRarityData.mjs";

const tokenData = getTokenData(getFileData(process.argv[2]));
const traitsFrequency = getTraitsFrequency(tokenData);
const rarityScores = calculateRarityScores(tokenData, traitsFrequency);
const flattenedRarityData = flattenRarityData(rarityScores);

console.log(flattenedRarityData);
