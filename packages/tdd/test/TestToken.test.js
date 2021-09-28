const { expect, use } = require("chai");
const { deployContract, MockProvider, solidity } = require("ethereum-waffle");

const TestToken = require("../build/TestToken.json");

use(solidity);

describe("TestToken", () => {
	const initialBalance = 1000;
	const [wallet, walletTo] = new MockProvider().getWallets();
	let token;

	beforeEach(async () => {
		token = await deployContract(wallet, TestToken, [initialBalance]);
	});

	it("Assign initial balance", async () => {
		expect(await token.balanceOf(wallet.address)).to.equal(initialBalance);
	});

	it("Transfer amount to another account", async () => {
		await token.transfer(walletTo.address, 20);
		expect(await token.balanceOf(walletTo.address)).to.equal(20);
		expect(await token.balanceOf(wallet.address)).to.equal(initialBalance - 20);
	});

	it("Transfer emits event", async () => {
		await expect(token.transfer(walletTo.address, 25))
			.to.emit(token, "Transfer")
			.withArgs(wallet.address, walletTo.address, 25);
	});

	it("Cannot transfer insufficient funds", async () => {
		await expect(token.transfer(walletTo.address, initialBalance + 1)).to.be
			.reverted;
	});

	it("Cannot transfer from empty account", async () => {
		const otherWallet = token.connect(walletTo);
		await expect(otherWallet.transfer(wallet.address, 1)).to.be.reverted;
	});

	it("Call totalSupply on the contract", async () => {
		await token.totalSupply();
		expect("totalSupply").to.be.calledOnContract(token);
	});

	it("Call balanceOf with sender address on the contract", async () => {
		await token.balanceOf(wallet.address);
		expect("balanceOf").to.be.calledOnContractWith(token, [wallet.address]);
	});
});
