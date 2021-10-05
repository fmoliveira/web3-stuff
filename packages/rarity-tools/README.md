# Rarity Tools

Calculate rarity score of NFTs with [rarity.tools](https://raritytools.medium.com/ranking-rarity-understanding-rarity-calculation-methods-86ceaeb9b98c) method.

## Getting started

### Requirements

You need a recent version of Node.js installed. Node.js version 14+ is recommended.

Other than Node.js, this project has no npm dependencies.

### Preparing JSON file with your NFT traits

To use this tool, you need a JSON file containing all the traits for each token IDs of your NFT.

Your JSON file must contain an array of objects, containing a string-key of your token id associated to another object with your traits. Your traits object can contain as many traits as you wish and there is no naming convention for them.

See an example below:

```json
[
	{
		"1": {
			"head": "Eizo's Hood",
			"shoulders": "Pilgrim's Pauldrons",
			"knees": "Arena Fighter's Polyens",
			"toes": "Boots of Agamemnon"
		}
	},
	{
		"2": {
			"head": "Eizo's Hood",
			"shoulders": "Pilgrim's Pauldrons",
			"knees": "Arena Fighter's Polyens",
			"toes": "Boots of Agamemnon"
		}
	},
	{
		"3": {
			"head": "Eizo's Hood",
			"shoulders": "Pilgrim's Pauldrons",
			"knees": "Arena Fighter's Polyens",
			"toes": "Boots of Agamemnon"
		}
	}
]
```

Moreover, you can download an example by running the command `yarn pull:example`. Check the downloaded file at `data/loot.json`.

> Why this format? Because it's what the [most popular Loot script](https://github.com/Anish-Agnihotri/dhof-loot) uses. Since the Loot contract has lots of derivatives, this tool will probably help more people by following that same format.

### Executing the tool

Run the script `src/index.mjs` passing the path to your JSON file as an argument, for example:

```sh
$ node src/index.mjs data/loot.json
```

The rarity statistics will be stored in the `output` folder (automatically created) with the same name as your input file, but with a CSV extension. Use Google Sheets or any other spreadsheets application to open it.
