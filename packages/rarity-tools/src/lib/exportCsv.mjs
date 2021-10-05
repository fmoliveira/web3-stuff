import fs from "fs";

import displayError from "./displayError.mjs";

/**
 * Export data to a CSV (comma separated values) file.
 */
export default function exportCsv(filename, data) {
	if (!filename || !data) {
		displayError(`
    ERROR: Missing arguments for exporting CSV file!
    `);
	}

	if (!fs.existsSync("output")) {
		fs.mkdirSync("output");
	}

	const destinationPath = `output/${filename}`;
	const fileContents = data.map((row) => row.join(",")).join("\n");
	fs.writeFileSync(destinationPath, fileContents);

	console.log(`Results exported to ${destinationPath}`);
}
