// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

contract AtlanticCBOR {

    string[] parameters;

    function decodeBuffer(bytes calldata _params) public {

        bytes calldata working_object = _params;
        uint8 input_length;
        uint8 hex_length;
        uint8 value;
        
        while (working_object.length > 0) {
            uint8 first_digit = uint8(working_object[0]);
            if (first_digit == 6) {
                input_length = uint8(working_object[1]);
                bytes calldata input = bytes(working_object[1: 2 + input_length]);
                parameters.push(decodeString(input));
                working_object = working_object[3 + input_length:];
            } else if (first_digit == 7) {
                if (uint8(working_object[1]) < 8) {
                    input_length = 16 + uint8(working_object[1]);
                } else {
                    hex_length = (uint8(working_object[1]) - 7);
                    // input_length = (working_object[2: 2 + hex_length]);
                }
            } else if (first_digit == 0) {
                value = first_digit;
            } else if (first_digit == 1) {
                if (uint8(working_object[1]) < 8) {
                    value = 16 + uint8(working_object[1]);
                } else {
                    hex_length = (uint8(working_object[1]) - 7);
                } 
            }
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