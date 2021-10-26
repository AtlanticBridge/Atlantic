// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "./utils/Math.sol";
import "@chainlink/contracts/src/v0.6/vendor/BufferChainlink.sol";
import "@chainlink/contracts/src/v0.6/vendor/CBORChainlink.sol";

contract AtlanticReceiverV1 is Math {

    using CBORChainlink for BufferChainlink.buffer;
    // using Chainlink for Chainlink.Request;

    struct Message {
        uint64 id;
        string method;
        address callback;
        uint32 amount;
        address destination;
        BufferChainlink.buffer buf;
    }

    Message[] allMessages;

    uint256 internal constant defaultBufferSize = 256; // solhint-disable-line const-name-snakecase
    uint64 messageCounter;
    address owner;
    mapping(uint64 => Message) private messages;
    mapping(uint64 => address) private messageOwners;

    // Chainlink Client Declarations
    uint256 fee;
    bytes32 jobId;
    address OracleAddress;

    constructor() public {
        messageCounter = 0;
    }

    //** CONTRACT EVENTS **//
    event FunctionExecuted(string _method, address _callback, uint32 _amount, address _destination);

    // ** CONTRACT LOGIC **//
    function get1Message(uint64 _messageId) public view returns (uint256, address, address, uint64, string memory) {
        Message memory message = messages[_messageId];
        return (message.amount, message.callback, message.destination, message.id, message.method);
    }

    function getMessage(uint64 _messageId) public view returns (Message memory) {
        Message memory message = messages[_messageId];
        return message;
    }

    // ** INBOUND LOGIC **//

    function receiveFromRemoteChain(
        string memory _method,
        address _callback,
        uint32 _amount,
        address _destination,
        uint64 _id
    ) public {

        // ** SAVE MESSAGE ** //
        Message memory message;
        message.id = _id;
        message.method = _method;
        message.callback = _callback;
        message.amount = _amount;
        message.destination = _destination;
        messages[_id] = message;

        // ** EXECUTE FUNCTION ** //
        if (keccak256(abi.encodePacked(message.method)) == keccak256(abi.encodePacked("executeFunction"))) {
            executeFunction(message);
        }
        
        if (keccak256(abi.encodePacked(message.method)) == keccak256(abi.encodePacked("executeFunctionTwo"))) {
            executeFunctionTwo(message);
        }
    }

    function executeFunction(Message memory message) private {
        emit FunctionExecuted(message.method, message.callback, message.amount, message.destination);
    }

    function executeFunctionTwo(Message memory message) private {
        emit FunctionExecuted(message.method, message.callback, message.amount, message.destination);
    }

    //** CONTRACT GOVERNANCE **//
    function setOwner(address _address) external {
        require(msg.sender == owner, "Only the owner can set a new owner");
        owner = _address;
    }

    function getOwner() external view returns(address) {
        return owner;
    }
}