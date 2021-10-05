/**
 * Displays a cleaned up error message and interrupts the process.
 */
export default function displayError(message) {
	const trimmedMessage = message
		.split("\n")
		.map((line) => line.trim()) // removes tabs from beginning of each line
		.filter(Boolean) // removes blank lines
		.join("\n");

	console.error(trimmedMessage);
	process.exit(1);
}
