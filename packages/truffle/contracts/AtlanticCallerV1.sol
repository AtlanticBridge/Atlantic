// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";
import "./utils/Math.sol";
import "./AtlanticMessageV1.sol";

/**
 * TODO Items:
 *
 * [1] Chainlink fee should be covered in the smart contract.
 * [1a] Include a modifier that requires a payment for the message transfer.
 */

contract AtlanticCallerV1 is ChainlinkClient, Math, Initializable {

    // ** MESSAGE PROTOCOL VARIABLES ** //
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
        BufferChainlink.buffer params;
    }
    // ******************************** //

    // ** CONTRACT FUNCTIONS ** //
    uint256 fee;
    bytes32 jobId;
    address OracleAddress;
    AtlanticMessageV1 atlanticMessage;

    // ** CONSTRUCTOR ** //
    function initializable(
        address _oracleAddress,
        address _atlanticMessageContract
    ) public initializer {
        setPublicChainlinkToken();
        // atlanticMessage = AtlanticMessage(_atlanticMessageContract);
        fee = 1 * 10 ** 18;
        OracleAddress = _oracleAddress;
    }

    //** CONTRACT EVENTS **//
    event FunctionExecuted(bool success, address destination, string method);
    event MessageSuccess(uint256 id, string method, address callback, uint32 amount, address destination);
    event MessageId(uint256 id);

    function setMessage(
        string calldata _method,
        address _callback,
        uint32 _amount,
        address _destination
    ) external {

    }
    
    function callFunction(uint64 _messageId, string memory _chainId) public {
        require(atlanticMessage.getMessageOwner(_messageId) == msg.sender, "Only the originator of the message can call a function with it.");
        Message memory message = messages[_messageId];
        sendToRemoteChain(_chainId, message);
    }

    /**
    * @notice Sets the jobId to be called on the Chainlink Node.
    * @param _jobId The jobId of the tasks on the Chainlink Node
    */
    function setJobId(string memory _jobId) public {
        jobId = stringToBytes32(_jobId);
    }

    function sendToRemoteChain(string memory _chainId, Message memory _message) private {
        // Send data to Chainlink node/CCIP however necessary
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        request.add("chainId", _chainId);
        request.addUint("id", _message.id);
        request.add("method", _message.method);
        request.add("callback", toAsciiString(_message.callback));
        request.addUint("amount", _message.amount);
        request.add("destination", toAsciiString(_message.destination));
        // Adds the bytes array of parameters for the function calls.
        request.addBytes("params", _message.params.buf);

        sendChainlinkRequestTo(OracleAddress, request, fee);
    }

    /**
    * @notice The fulfill function for the Chainlink EA Job.
    * @param _requestId The Chainlink request id.
    * @param _messageId The message transmitted.
    */
    function fulfill(bytes32 _requestId, uint64 _messageId) public recordChainlinkFulfillment(_requestId)
    {
        Message memory message = messages[_messageId];
        emit MessageSuccess(message.id, message.method, message.callback, message.amount, message.destination);
    }

    // ** MESSAGE BUILDING FUNCTIONS ** //
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
        BufferChainlink.init(message.params, defaultBufferSize);
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


    // ** MESSAGE RELAY FUNCTIONS ** //
    /**
    * @notice Adds a string value to the request with a given key name
    * @param _id The id of the messages
    * @param _key The name of the key
    * @param _value The string value to add
    */
    function add(uint64 _id, string memory _key, string memory _value) internal view {
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
    function addBytes(uint64 _id, string memory _key, bytes memory _value) internal view {
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
    function addInt(uint64 _id, string memory _key, int256 _value) internal view {
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
    function addUint(uint64 _id, string memory _key, uint256 _value) internal view {
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
    function addStringArray(uint64 _id, string memory _key, string[] memory _values) internal view {
        Message memory message = messages[_id];
        message.params.encodeString(_key);
        message.params.startArray();
        for (uint256 i = 0; i < _values.length; i++) {
            message.params.encodeString(_values[i]);
        }
        message.params.endSequence();
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