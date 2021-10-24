// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";
import "./utils/Math.sol";
import "./AtlanticMessageV1.sol";

contract AtlanticCallerV1 is ChainlinkClient, Math, Initializable {

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
        atlanticMessage = AtlanticMessage(_atlanticMessageContract);
        fee = 1 * 10 ** 18;
        OracleAddress = _oracleAddress;
    }

    //** CONTRACT EVENTS **//
    event FunctionExecuted(bool success, address destination, string method);
    event MessageSuccess(uint256 id, string method, address callback, uint32 amount, address destination);

    function setMessage(
        string calldata _method,
        address _callback,
        uint32 _amount,
        address _destination
    ) external {

    }
    
    function callFunction(uint64 _messageId, string memory _chainId) public {
        require(atlanticMessage.getMessageOwner(_messageId) == msg.sender, "Only the originator of the message can call a function with it.");
        // Message memory message = messages[_id];
        AtlanticMessage.Message memory message = atlanticMessage.getMessage(_messageId);
        sendToRemoteChain(_chainId, message);
    }

    /**
    * @notice Sets the jobId to be called on the Chainlink Node.
    * @param _jobId The jobId of the tasks on the Chainlink Node
    */
    function setJobId(string memory _jobId) public {
        jobId = stringToBytes32(_jobId);
    }

    function sendToRemoteChain(string memory _chainId, AtlanticMessage.Message memory _message) private {
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
        AtlanticMessage.Message memory message = atlanticMessage.messages[_messageId];
        emit MessageSuccess(message.id, message.method, message.callback, message.amount, message.destination);
    }

    // ** INBOUND LOGIC **//

    function receiveFromRemoteChain(string calldata _method, address _callback, uint32 _amount, address _destination) external {
        // decode buffer
        // call execute function
        executeFunction(_method, _callback, _amount, _destination);
    }

    function executeFunction(string memory _method, address _callback, uint32 _amount, address _destination) private {
        // https://ethereum.stackexchange.com/questions/9733/calling-function-from-deployed-contract
        // https://stackoverflow.com/questions/54360047/calling-function-from-already-deployed-contract-in-solidity
        // https://medium.com/@houzier.saurav/calling-functions-of-other-contracts-on-solidity-9c80eed05e0f
        // https://ethereum.stackexchange.com/questions/64881/how-does-delegatecall-work-from-solidity-0-5-0-onwards
    }



    // ** MESSAGE RELAY FUNCTIONS ** //
    /**
    * @notice Adds a string value to the request with a given key name
    * @param _id The id of the messages
    * @param _key The name of the key
    * @param _value The string value to add
    */
    function add(uint64 _id, string memory _key, string memory _value) public view {
        atlanticMessage.add(_id, _key, _value);
    }

    /**
    * @notice Adds a bytes value to the request with a given key name
    * @param _id The id of the message
    * @param _key The name of the key
    * @param _value The bytes value to add
    */
    function addBytes(uint64 _id, string memory _key, bytes memory _value) public view {
        atlanticMessage.addBytes(_id, _key, _value);
    }

    /**
    * @notice Adds a int256 value to the request with a given key name
    * @param _id The id of the message
    * @param _key The name of the key
    * @param _value The int256 value to add
    */
    function addInt(uint64 _id, string memory _key, int256 _value) public view {
        atlanticMessage.addInt(_id, _key, _value);
    }

    /**
    * @notice Adds a uint256 value to the request with a given key name
    * @param _id The id of the message
    * @param _key The name of the key
    * @param _value The uint256 value to add
    */
    function addUint(uint64 _id, string memory _key, uint256 _value) public view {
        atlanticMessage.addUint(_id, _key, _value);
    }
}