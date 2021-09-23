import { NextApiRequest, NextApiResponse } from "next";

const GET_API_URL =
	"https://api.etherscan.io/api?module=contract&action=getabi&address=";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { contractAddress } = req.query;

	if (!contractAddress) {
		res.status(400).send({ error: { message: "Invalid contract address" } });
	}

	const abiUrl = `${GET_API_URL}${contractAddress}`;
	const abiResponse = await fetch(abiUrl).then((res) => res.json());
	const abiResult = abiResponse.result;

	res.status(200).json(abiResult);
}
