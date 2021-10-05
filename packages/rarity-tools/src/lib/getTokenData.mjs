import displayError from "./displayError.mjs";

const checkReadme = "Check the README.md for more details.";
const checkFileSpec =
	"Please make sure your JSON file contains an array of objects, each object containing a key-object pair with your traits.";

/**
 * Gets token data from the input file or throw errors in case a validation fails.
 */
export default function getTokenData(fileContents) {
	// parses file contents as JSON
	let json;
	try {
		json = JSON.parse(fileContents);
	} catch (error) {
		displayError(`
    ERROR: Supplied JSON file is malformed!
    The error message was: ${error}
    Please validate your JSON file at https://jsonformatter.curiousconcept.com/ and try again.
    `);
	}

	// asserts that JSON contains an array
	if (!Array.isArray(json)) {
		displayError(`
    ERROR: Supplied JSON file does not follow the file format specifications!
    ${checkFileSpec}
    ${checkReadme}
    `);
	}

	// asserts that the array is not empty
	if (json.length === 0) {
		displayError(`
    ERROR: Supplied JSON file contains only an empty array!
    ${checkFileSpec}
    ${checkReadme}
    `);
	}

	// asserts that each element of the array contains an object with only one key-object pair
	const tokenList = [];
	json.forEach((tokenData, index) => {
		const { tokenId, traitsList } = assertObjectIsValid(tokenData, index);
		tokenList.push({
			tokenId,
			traitsList,
		});
	});

	// input data is all good!
	return tokenList;
}

/**
 * Asserts that each object follows the format specification correctly.
 */
function assertObjectIsValid(tokenData, index) {
	// token data must be an object
	if (typeof tokenData !== "object") {
		displayError(`
    ERROR: Element at index ${index} from the array in your JSON file is not an object!
    `);
	}

	const keys = Object.keys(tokenData);

	// token data must contain one key-object pair
	if (keys.length === 0) {
		displayError(`
    ERROR: Object at index ${index} must contain a key-object pair!
    ${checkFileSpec}
    ${checkReadme}
    `);
	}

	// token data must not contain more than one key-object pair
	if (keys.length !== 1) {
		displayError(`
    ERROR: Object at index ${index} contains ${keys.length} key pairs but it must have only one!
    ${checkFileSpec}
    ${checkReadme}
    `);
	}

	const [tokenId] = keys;
	const traitsList = tokenData[tokenId];
	const whatType = typeof traitsList;

	// token traits must be an object
	if (whatType !== "object") {
		displayError(`
    ERROR: Key-pair at token id ${tokenId} must be mapped to an object, but it's a ${whatType}.
    ${checkFileSpec}
    ${checkReadme}
    `);
	}

	const traitsEntries = Object.keys(traitsList);

	// no trait names should be empty
	if (!traitsEntries.every((i) => i.length !== 0)) {
		displayError(`
    ERROR: Traits names at token id ${tokenId} must not be empty!
    ${checkFileSpec}
    ${checkReadme}
    `);
	}

	// token traits object must contain at least one entry
	if (traitsEntries.length === 0) {
		displayError(`
    ERROR: Traits object at token id ${tokenId} must contain at least one trait!
    ${checkFileSpec}
    ${checkReadme}
    `);
	}

	// token traits values must not be empty
	traitsEntries.forEach((traitName) => {
		const traitValue = traitsList[traitName];
		if (String(traitValue).length === 0) {
			displayError(`
      ERROR: Value for trait '${traitName}' at token id ${tokenId} must not be empty!
      ${checkFileSpec}
      ${checkReadme}
      `);
		}
	});

	return { tokenId, traitsList };
}
