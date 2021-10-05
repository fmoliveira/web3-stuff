import getFileData from "./lib/getFileData.mjs";
import getTokenData from "./lib/getTokenData.mjs";

const tokenData = getTokenData(getFileData(process.argv[2]));

console.log(tokenData);
