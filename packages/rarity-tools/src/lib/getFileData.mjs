import fs from "fs";

import displayError from "./displayError.mjs";

/**
 * Gets contents of input filename.
 */
export default function getFileData(fileName) {
	// filename argument must be supplied
	if (!fileName) {
		displayError(`
    ERROR: Input filename not supplied!
    Please supply the path to your JSON traits file as an argument:
		> $ node src/index.mjs data/loot.json");
    ${checkReadme}
    `);
	}

	// supplied filename must exist
	if (!fs.existsSync(fileName)) {
		displayError(`
    ERROR: Input file '${fileName}' does not exist!
    Please supply a path to an existing JSON file containing your traits.
    ${checkReadme}
    `);
	}

	// reads file contents
	let contents;
	try {
		contents = fs.readFileSync(fileName);
	} catch (error) {
		displayError(`
    ERROR: Failed to read the supplied file!
    The error message was: ${error}
    Please read the error message above carefully, try to address the problem, and try again.
    `);
	}

	return contents;
}
