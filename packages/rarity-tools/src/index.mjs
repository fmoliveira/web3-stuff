import path from "path";

import getFileData from "./lib/getFileData.mjs";
import getTokenData from "./lib/getTokenData.mjs";
import getTraitsFrequency from "./lib/getTraitsFrequency.mjs";
import calculateRarityScores from "./lib/calculateRarityScores.mjs";
import flattenRarityData from "./lib/flattenRarityData.mjs";
import exportCsv from "./lib/exportCsv.mjs";

const inputFileName = process.argv[2];

const tokenData = getTokenData(getFileData(inputFileName));
const traitsFrequency = getTraitsFrequency(tokenData);
const rarityScores = calculateRarityScores(tokenData, traitsFrequency);
const flattenedRarityData = flattenRarityData(rarityScores);

const outputFileName = path.basename(inputFileName).replace(/\.json$/, ".csv");
exportCsv(outputFileName, flattenedRarityData);
