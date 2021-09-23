// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract DeployContract {

    function deployFromByteCode(bytes memory _byteCode) public pure returns (bytes memory) {
        return _byteCode;
    }

    function deployFromAddress(address _addr) public view returns (bytes memory o_code) {
        assembly {
            mstore(0x40, 0x60)
        }
        return _addr.code;
    }

}

// https://jeancvllr.medium.com/solidity-tutorial-all-about-assembly-5acdfefde05c