// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

library ConvertLib {
	function convert(uint amount,uint conversionRate) public pure returns (uint convertedAmount)
	{
		return amount * conversionRate;
	}
}
