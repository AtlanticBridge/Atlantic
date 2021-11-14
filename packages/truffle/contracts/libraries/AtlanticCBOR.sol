// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

contract AtlanticCBOR {

    string[] parameters;

    function decodeBuffer(bytes calldata _params) public {

        bytes calldata working_object = _params;

        if (uint8(working_object[0]) == 6) {
            uint8 input_length = uint8(working_object[1]);
            bytes calldata input = bytes(working_object[1: 2 + input_length]);
            parameters.push(decodeString(input));
            working_object = working_object[3 + input_length:];
        } else if (uint8(working_object[0]) == 7 && uint8(working_object[1]) == 8) {
            
        }
    }

    function decodeString(bytes memory _string) private pure returns(string memory) {
        return string(abi.encodePacked(_string));
    }

// string
// bytes
// int
// uint
// string array

}