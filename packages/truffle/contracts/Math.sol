// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Math {


    /**
     * @dev Returns the string of a uint input value.
     *
     */
    function uint2str(
        uint _i
    ) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;

        while (j != 0) {
            len++;
            j /= 10;
        }

        bytes memory bstr = new bytes(len);
        uint k = len - 1;

        while (_i != 0) {
            bstr[k--] = byte(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }


    /**
     * @dev Returns the uint256 value from a given bytes32 string.
     *
     */
    function asciiToInteger(bytes32 x) public pure returns (uint256) {
        uint256 y;
        for (uint256 i = 0; i < 32; i++) {
            uint256 c = (uint256(x) >> (i * 8)) & 0xff;
            if (48 <= c && c <= 57)
                y += (c - 48) * 10 ** i;
            else
                break;
        }
        return y;
    }


    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    function bytesToUint(bytes memory b) public pure returns (uint256) {
        uint256 number;
        for(uint i=0;i<b.length;i++){
            number = number + uint(uint8(b[i]))*(2**(8*(b.length-(i+1))));
        }
        return number;
    }

    function uintToBytes(uint256 i) public pure returns (bytes memory) {
        bytes memory b = new bytes(32);
        assembly { mstore(add(b, 32), i) }

        return b;
    }

}