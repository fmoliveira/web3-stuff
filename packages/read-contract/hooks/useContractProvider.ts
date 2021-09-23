import { useMemo } from "react";
import { ethers } from "ethers";

export function useContractProvider(contractAddress, contractAbi) {
	const getContract = () => {
		if (!window.ethereum) {
			return null;
		}

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const contract = new ethers.Contract(
			contractAddress,
			contractAbi,
			provider,
		);

		return contract;
	};

	return { getContract };
}
