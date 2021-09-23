import useSWR from "swr";

export function useContractMetadata(contractAddress: string) {
	const fetcher = () => {
		if (!contractAddress) {
			return null;
		}

		const metadataUrl = `/api/contract/metadata?contractAddress=${contractAddress}`;
		return fetch(metadataUrl).then((res) => res.json());
	};

	return useSWR(["contractMetadata", contractAddress], fetcher);
}
