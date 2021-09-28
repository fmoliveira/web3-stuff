//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
	constructor(uint256 initialBalance) public ERC20("Test Token", "TEST") {
		_mint(msg.sender, initialBalance);
	}
}
