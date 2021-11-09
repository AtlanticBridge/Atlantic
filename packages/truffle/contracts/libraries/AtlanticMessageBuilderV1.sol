// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import { BufferChainlink } from "@chainlink/contracts/src/v0.6/vendor/BufferChainlink.sol";
import { CBORChainlink } from "@chainlink/contracts/src/v0.6/vendor/CBORChainlink.sol";

library AtlanticMessageBuilderV1 {
    uint256 internal constant defaultBufferSize = 256; // solhint-disable-line const-name-snakecase

    using CBORChainlink for BufferChainlink.buffer;
    
    struct Message {
        uint capacity;
        bytes buf;
    }

    // ** MESSAGE RELAY FUNCTIONS ** //
    /**
    * @notice Adds a string value to the request with a given key name
    * @param _id The id of the messages
    * @param _key The name of the key
    * @param _value The string value to add
    */
    function addParam(
        uint64 _id,
        string calldata _key,
        string calldata _value
    ) external view messageOwner(_id) {
        Message memory message = messages[_id];
        message.params.encodeString(_key);
        message.params.encodeString(_value);
    }

    /**
    * @notice Adds a bytes value to the request with a given key name
    * @param _id The id of the message
    * @param _key The name of the key
    * @param _value The bytes value to add
    */
    function addBytesParam(
        uint64 _id,
        string calldata _key,
        bytes calldata _value
    ) external view messageOwner(_id) {
        Message memory message = messages[_id];
        message.params.encodeString(_key);
        message.params.encodeBytes(_value);
    }

    /**
    * @notice Adds a int256 value to the request with a given key name
    * @param _id The id of the message
    * @param _key The name of the key
    * @param _value The int256 value to add
    */
    function addIntParam(
        uint64 _id,
        string calldata _key,
        int256 _value
    ) external view messageOwner(_id) {
        Message memory message = messages[_id];
        message.params.encodeString(_key);
        message.params.encodeInt(_value);
    }

    /**
    * @notice Adds a uint256 value to the request with a given key name
    * @param _id The id of the message
    * @param _key The name of the key
    * @param _value The uint256 value to add
    */
    function addUintParam(
        uint64 _id,
        string calldata _key,
        uint256 _value
    ) external view messageOwner(_id) {
        Message memory message = messages[_id];
        message.params.encodeString(_key);
        message.params.encodeUInt(_value);
    }

    /**
    * @notice Adds an array of strings to the request with a given key name
    * @param _id The id of the message
    * @param _key The name of the key
    * @param _values The array of string values to add
    */
    function addStringArrayParam(
        uint64 _id,
        string memory _key,
        string[] memory _values
    ) internal view messageOwner(_id) {
        Message memory message = messages[_id];
        message.params.encodeString(_key);
        message.params.startArray();
        for (uint256 i = 0; i < _values.length; i++) {
            message.params.encodeString(_values[i]);
        }
        message.params.endSequence();
    }


    // ** MODIFIERS ** //
    modifier messageOwner(uint64 _id, address _messageOwner) {
        require(_messageOwner == msg.sender, "Only the originator of the message can call a function with it.");
        _;
    }
}