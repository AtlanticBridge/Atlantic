// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/vendor/BufferChainlink.sol";
import "@chainlink/contracts/src/v0.6/vendor/CBORChainlink.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";
// Add Interface
import "./interfaces/MessageInterface.sol";

contract AtlanticMessageV1 is Initializable {

    using CBORChainlink for BufferChainlink.buffer;

    // ** CONTRACT VARIABLES ** //
    uint256 internal constant defaultBufferSize = 256; // solhint-disable-line const-name-snakecase
    uint64 messageCounter;
    address owner;
    mapping(uint64 => Message) private messages;
    mapping(uint64 => address) private messageOwners;
    mapping(address => bool) private validContracts;

    struct Message {
        uint64 id;
        string method;
        address callback;
        uint32 amount;
        address destination;
        BufferChainlink.buffer buf;
    }

    //** CONTRACT EVENTS **//
    event MessageId(uint256 id);

    // ** CONSTRUCTOR ** //
    function initializable() public initializer {
        messageCounter = 0;
        owner = msg.sender;
    }

    /**
     * @notice Initializes a Atlantic Message for CCIP
     * @dev Sets the ID, method, callback, amount, and destination on the request
     * @param _method The function method
     * @param _callback The callback address
     * @param _amount The transfer amount
     * @param _destination The call destination
     *
     * Emits the Message ID.
     *
     * Example)
     * "executeFunction","0x86577a2EB86f38d63bcd2B20AfFFa843824D5BFc",24,"0xEaed3B434d0FFf6D6d7AA80D72a3B47dD86A3617"
     */
    function initializeMessage(
        string calldata _method,
        address _callback,
        uint32 _amount,
        address _destination
    ) external validContract(msg.sender) returns (uint64 id) {
        Message memory message;
        id = messageCounter + 1;
        messageCounter++;
        messageOwners[id] = msg.sender;
        BufferChainlink.init(message.buf, defaultBufferSize);
        message.id = id;
        message.method = _method;
        message.callback = _callback;
        message.amount = _amount;
        message.destination = _destination;
        messages[id] = message;

        emit MessageId(id);
    }

    // ** CONTRACT LOGIC **//
    function getMessage(uint64 _messageId) public view returns (uint256, address, address, uint64, string memory) {
        Message memory message = messages[_messageId];
        return (message.amount, message.callback, message.destination, message.id, message.method);
    }
    
    function getMessageOwner(
        uint64 id
    ) external view returns (address) {
        address messageOwner = messageOwners[id];
        return messageOwner;
    }


    // ********************** //
    // ** BUFFER FUNCTIONS ** //
    // ********************** //
    // Buffer functions should only be called by our integrate Atlantic contracts.
    /**
    * @notice Sets the data for the buffer without encoding CBOR on-chain
    * @dev CBOR can be closed with curly-brackets {} or they can be left off
    * @param self The initialized request
    * @param _data The CBOR data
    */
    function setBuffer(Message memory self, bytes memory _data) internal pure {
        BufferChainlink.init(self.buf, _data.length);
        BufferChainlink.append(self.buf, _data);
    }

    /**
    * @notice Adds a string value to the request with a given key name
    * @param _id The id of the messages
    * @param _key The name of the key
    * @param _value The string value to add
    */
    function add(uint64 _id, string memory _key, string memory _value) internal view {
        Message memory message = messages[_id];
        message.buf.encodeString(_key);
        message.buf.encodeString(_value);
    }

    /**
    * @notice Adds a bytes value to the request with a given key name
    * @param _id The id of the message
    * @param _key The name of the key
    * @param _value The bytes value to add
    */
    function addBytes(uint64 _id, string memory _key, bytes memory _value) internal view {
        Message memory message = messages[_id];
        message.buf.encodeString(_key);
        message.buf.encodeBytes(_value);
    }

    /**
    * @notice Adds a int256 value to the request with a given key name
    * @param _id The id of the message
    * @param _key The name of the key
    * @param _value The int256 value to add
    */
    function addInt(uint64 _id, string memory _key, int256 _value) internal view {
        Message memory message = messages[_id];
        message.buf.encodeString(_key);
        message.buf.encodeInt(_value);
    }

    /**
    * @notice Adds a uint256 value to the request with a given key name
    * @param _id The id of the message
    * @param _key The name of the key
    * @param _value The uint256 value to add
    */
    function addUint(uint64 _id, string memory _key, uint256 _value) internal view {
        Message memory message = messages[_id];
        message.buf.encodeString(_key);
        message.buf.encodeUInt(_value);
    }

    /**
    * @notice Adds an array of strings to the request with a given key name
    * @param _id The id of the message
    * @param _key The name of the key
    * @param _values The array of string values to add
    */
    function addStringArray(uint64 _id, string memory _key, string[] memory _values) internal view {
        Message memory message = messages[_id];
        message.buf.encodeString(_key);
        message.buf.startArray();
        for (uint256 i = 0; i < _values.length; i++) {
            message.buf.encodeString(_values[i]);
        }
        message.buf.endSequence();
    }


    // ** SETUP FUNCTIONS ** //
    function addValidContract(
        address _contract
    ) external onlyOwner {
        validContracts[_contract] = true;
    }

    function transferOwner(
        address _newOwner
    ) external onlyOwner {
        owner = _newOwner;
    }


    // ** MODIFIERS ** //
    modifier validContract(address _contract) {
        if(validContracts[_contract] == true) {
            _;
        }
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier messageOwner(uint64 _id) {
        require(messageOwners[_id] == msg.sender, "Only the originator of the message can call a function with it.");
        _;
    }
}