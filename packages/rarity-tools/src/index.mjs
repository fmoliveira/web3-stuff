import getFileData from "./lib/getFileData.mjs";
import getTokenData from "./lib/getTokenData.mjs";
import getTraitsFrequency from "./lib/getTraitsFrequency.mjs";

const tokenData = getTokenData(getFileData(process.argv[2]));
const traitsFrequency = getTraitsFrequency(tokenData);

console.log(traitsFrequency);
