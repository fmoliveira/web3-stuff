import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare global {
	var ethereum: ethers.providers.ExternalProvider;
}

export enum Network {
	Mainnet = 1,
	Rinkeby = 4,
}

export function useWallet() {
	const [account, setAccount] = useState(null);
	const [network, setNetwork] = useState(null);

	const updateStatus = async () => {
		setAccount(await isConnected());
		setNetwork(await getNetwork());
	};

	useEffect(() => {
		updateStatus();
	}, [account]);

	const connect = async () => setAccount(await connectWallet());

	return { account, network, connect };
}

const isConnected = async () => {
	if (!window.ethereum) {
		return false;
	}

	const accountList = await window.ethereum.request({ method: "eth_accounts" });
	return accountList.length !== 0;
};

const getNetwork = () => {
	if (!window.ethereum) {
		return null;
	}

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	return provider.getNetwork();
};

const connectWallet = () => {
	return window.ethereum
		.request({ method: "eth_requestAccounts" })
		.then((accountList) => {
			const [firstAccount] = accountList;
			return firstAccount;
		});
};
