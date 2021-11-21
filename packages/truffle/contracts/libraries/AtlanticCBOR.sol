// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

contract AtlanticCBOR {

    string[] parameters;

    function decodeBuffer(bytes calldata working_object) public {
        
        while (working_object.length > 0) {
            uint8 first_digit = uint8(working_object[0]);
            if (first_digit == 6) {
                working_object = processDecoding(working_object, 1, 0, true);
            } else if (first_digit == 7) {
                if (uint8(working_object[1]) < 8) {
                    working_object = processDecoding(working_object, 1, 16, true);
                } else {
                    working_object = processDecoding(working_object, 2, 0, true);
                }
            } else if (first_digit == 0) {
                working_object = processDecoding(working_object, 1, 0 , false);
            } else if (first_digit == 1) {
                if (uint8(working_object[1]) < 8) {
                    working_object = processDecoding(working_object, 1, 16 , false);
                } else {
                    working_object = processDecoding(working_object, 2, 0 , false);
                } 
            } else if (first_digit == 2) {
                working_object = processDecoding(working_object, 1, -1, false);
            } else if (first_digit == 3) {
                if (uint8(working_object[1]) < 8) {
                    working_object = processDecoding(working_object, 1, -17, false);
                } else {
                    working_object = processDecoding(working_object, 2, -1, false);
                }
            }
        }
    }

    function processDecoding(bytes calldata working_object, uint8 input_signifiers, int8 extra_length, bool _string) pure public returns (bytes calldata new_working_object) {

        uint256 hex_length = 0;
        int256 input_length = 0;

        if ((uint8(working_object[1]) - 7) > 0) {
            hex_length = 2 ** (uint8(working_object[1]) - 7);
        }
        input_length = int256(uint256(bytes32(working_object[input_signifiers: input_signifiers + uint256(hex_length)])));
        if (_string) {
            bytes memory input = bytes(working_object[1 + input_signifiers: 1 + uint256(input_signifiers) + uint256(input_length)]);
            string memory value = decodeString(input);
        } else {
            int256 value = input_length;
            input_length = int256(hex_length);
        }
        return working_object[1 + 1 + uint256(input_signifiers) + uint256(input_length):];
    }

    function decodeString(bytes memory _string) private pure returns(string memory) {
        return string(abi.encodePacked(_string));
    }

}