import Head from "next/head";
import { Fragment, useCallback, useEffect, useState } from "react";
import cx from "classnames";

import { useContractMetadata } from "../hooks/useContractMetadata";
import { useWallet } from "../hooks/useWallet";
import { useContractProvider } from "../hooks/useContractProvider";

export default function Home() {
	const [address, setAddress] = useState("");
	const { data } = useContractMetadata(address);
	const { account, connect } = useWallet();

	useEffect(() => {
		if (!account && address) {
			connect();
		}
	}, [address]);

	return (
		<div>
			<SEO />
			<main>
				<Header />
				<Form address={address} setAddress={setAddress} />
				<ReadOperations contractAddress={address} contractMetadata={data} />
			</main>
		</div>
	);
}

function SEO() {
	return (
		<Head>
			<title>Read Contract</title>
			<meta
				name="description"
				content="Read metadata from an Ethereum smart contract"
			/>
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
}

function Header() {
	return (
		<section className="center">
			<h1>Read Contract</h1>
			<p>Read metadata from an Ethereum smart contract</p>
		</section>
	);
}

function Form({ address, setAddress }) {
	return (
		<section>
			<form className="center">
				<label htmlFor="contractAddress">Contract address:</label>
				<input
					type="text"
					id="contractAddress"
					name="contractAddress"
					value={address}
					onChange={(event) => setAddress(event.target.value)}
				/>
			</form>
		</section>
	);
}

function ReadOperations({ contractAddress, contractMetadata }) {
	const [highlights, setHighlights] = useState({});
	const [values, setValues] = useState({});
	const provider = useContractProvider(contractAddress, contractMetadata);

	const updateValues = useCallback(() => {
		const watching = Object.keys(highlights).filter(
			(item) => highlights[item] === true,
		);
		watching.forEach(async (operation) => {
			const value = await provider.getContract()[operation]();
			setValues({
				...values,
				[operation]: value.toString(),
			});
		});
	}, [highlights]);

	useEffect(() => {
		updateValues();
		const interval = setInterval(updateValues, 2000);

		return () => {
			clearInterval(interval);
		};
	}, [updateValues]);

	const toggleHighlight = (operationName: string) => {
		setHighlights({
			...highlights,
			[operationName]: !highlights[operationName],
		});
	};

	if (!contractMetadata) {
		return (
			<div className="center">
				Enter a contract address above to see the read operations.
			</div>
		);
	}

	const readFunctionList = contractMetadata.filter(
		(item) => item.stateMutability === "view",
	);

	if (!readFunctionList) {
		return (
			<div className="center">No read operations found in the contract.</div>
		);
	}

	return (
		<div className="operation-grid">
			{readFunctionList.map(({ name }) => (
				<Fragment key={name}>
					<div
						className={cx(
							"operation-name",
							highlights[name] && "operation--highlight",
						)}
						onClick={() => toggleHighlight(name)}
					>
						{name}
					</div>
					<div className="operation-value">{values[name] ?? "-"}</div>
				</Fragment>
			))}
		</div>
	);
}
