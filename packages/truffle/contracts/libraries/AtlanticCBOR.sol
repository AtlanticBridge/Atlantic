// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

contract AtlanticCBOR {

    string[] parameters;

    function decodeBuffer(bytes calldata _params) public {

        bytes calldata working_object = _params;
        uint8 input_length;
        uint256 hex_length;
        int8 value;
        bool is_parameter = true;

        // first_digit
        // input_length -- input_signifier
        // extra_length
        // hex_length

        
        while (working_object.length > 0) {
            uint8 first_digit = uint8(working_object[0]);
            if (first_digit == 6) {
                working_object = processDecoding(working_object, 1, 0, true);
                // input_length = uint8(working_object[1]);
                // bytes calldata input = bytes(working_object[2: 2 + input_length]);
                // parameters.push(decodeString(input));
                // working_object = working_object[3 + input_length:];
            } else if (first_digit == 7) {
                if (uint8(working_object[1]) < 8) {
                    input_length = 16 + uint8(working_object[1]);
                    hex_length = 0;
                } else {
                    hex_length = 2 ** (uint8(working_object[1]) - 7);
                    // input_length = uint8(working_object[2: 2 + hex_length]);
                }
                bytes calldata input = bytes(working_object[2 + hex_length: 2 + hex_length + input_length]);
                parameters.push(decodeString(input));
                working_object = working_object[3 + hex_length + input_length:];
            } else if (first_digit == 0) {
                input_length = 1;
                working_object = working_object[1 + input_length:];
                value = int8(uint8(working_object[1]));
            } else if (first_digit == 1) {
                if (uint8(working_object[1]) < 8) {
                    value = 16 + int8(uint8(working_object[1]));
                } else {
                    hex_length =  2 ** (uint8(working_object[1]) - 7);
                } 

            } else if (first_digit == 2) {
                input_length = 1;
                working_object = working_object[1 + input_length:];
                value = -int8(uint8(working_object[1])) - 1;
            } else if (first_digit == 3) {
                if (uint8(working_object[1]) < 8) {
                    value = -16 - int8(uint8(working_object[1])) - 1;
                } else {
                    hex_length =  2 ** (uint8(working_object[1]) - 7);
                }
            }
        }
    }

    function processDecoding(bytes calldata working_object, uint8 input_signifiers, uint8 extra_length, bool _string) pure public returns (bytes calldata new_working_object) {
        uint256 hex_length = 0;
        if ((uint8(working_object[1]) - 7) > 0) {
            hex_length = 2 ** (uint8(working_object[1]) - 7);
        }
        uint8 input_length = uint8(working_object[input_signifiers]) + extra_length + uint8(hex_length);
        bytes memory input = bytes(working_object[1 + input_signifiers: 1 + input_signifiers + input_length]);
        if (_string) {
            decodeString(input);
        } else {

        }
        return working_object[1 + 1 + input_signifiers + input_length:];
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