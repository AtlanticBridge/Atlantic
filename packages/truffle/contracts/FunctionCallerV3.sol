// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "./Math.sol";

contract FunctionCallerV3 is ChainlinkClient, Math {

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

    constructor(address _oracleAddress) public {
        // setPublicChainlinkToken();
        messageCounter = 0;

        // Chainlink Client Info
        fee = 1 * 10 ** 18;
        OracleAddress = _oracleAddress;
    }

    //** CONTRACT EVENTS **//
    event FunctionExecuted(bool success, address destination, string method);
    event MessageSuccess(uint256 id, string method, address callback, uint32 amount, address destination);
    event MessageId(uint256 id);

    // ** OUTBOUND LOGIC **//
    /**
   * @notice Initializes a Atlantic Message for CCIP
   * @dev Sets the ID, method, callback, amount, and destination on the request
   * @param _method The function method
   * @param _callback The callback address
   * @param _amount The transfer amount
   * @param _destination The call destination
   * @return id The id
   *
   * Example)
   * "executeFunction","0x86577a2EB86f38d63bcd2B20AfFFa843824D5BFc",24,"0xEaed3B434d0FFf6D6d7AA80D72a3B47dD86A3617"
   */
    function initializeMessage(
        string calldata _method,
        address _callback,
        uint32 _amount,
        address _destination
    ) external returns (uint64 id) {
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
    
    function getMessageOwner(uint64 id) public view returns (address) {
        address messageOwner = messageOwners[id];
        return messageOwner;
    }

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

    function callFunction(uint64 _id, string memory _chainId) public {
        require(messageOwners[_id] == msg.sender, "Only the originator of the message can call a function with it.");
        Message memory message = messages[_id];
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

    // ** INBOUND LOGIC **//

    function receiveFromRemoteChain(string calldata _method, address _callback, uint32 _amount, address _destination) external {
        // decode buffer
        // call execute function
        executeFunction(_method, _callback, _amount, _destination);
    }

    function executeFunction(string memory _method, address _callback, uint32 _amount, address _destination) private {
        // contract_address.call.value(1 ether).gas(10)(abi.encodeWithSignature("register(string)", "MyName"));
        address dest = _destination;
        dest.call.value(1 ether).gas(10)(abi.encodeWithSignature("setFoo", 99));
        // https://ethereum.stackexchange.com/questions/9733/calling-function-from-deployed-contract
        // https://stackoverflow.com/questions/54360047/calling-function-from-already-deployed-contract-in-solidity
        // https://medium.com/@houzier.saurav/calling-functions-of-other-contracts-on-solidity-9c80eed05e0f
        // https://ethereum.stackexchange.com/questions/64881/how-does-delegatecall-work-from-solidity-0-5-0-onwards
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