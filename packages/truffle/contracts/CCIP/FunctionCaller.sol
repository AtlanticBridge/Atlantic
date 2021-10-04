// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "../Math.sol";

contract FunctionCaller is ChainlinkClient, Math {

    address owner;

    // --- For Chainlink Client ---
    uint256 fee;
    bytes32 jobId;
    address OracleAddress;
    // ----------------------------

    // struct Message {
    //     uint32 id;
    //     string method;
    //     uint8 callback;
    //     bytes params;
    //     uint32 amount;
    //     address destination;
    // }

    // ** CONTRACT CONSTRUCTOR **//

    constructor(address _oracleAddress) public {
        setPublicChainlinkToken();
        fee = 1 * 10 ** 18;
        // jobId = "8d2ca44104864643814d685ecf6fc930";
        OracleAddress = _oracleAddress;
    }

    //** CONTRACT EVENTS **//
    // event FunctionExecuted(bool success, address destination, string method);
    event Success(bytes message);

    // ** CONTRACT LOGIC **//

    // function messageStructToBytes(Message memory _m) private pure returns(bytes memory data) {
    //     // _size = "sizeof" _m.id + "sizeof" _m.method + "sizeof" _m.callback + "sizeof" _m.params + "sizeof" _m.amount
    //     uint _size = 4 + bytes(_m.method).length + abi.encodePacked(_m.callback).length + _m.params.length + 4;
    //     bytes memory _data = new bytes(_size);

    //     uint counter=0;
    //     for (uint i=0;i<4;i++)
    //     {
    //         /** _data[counter]=toBytes(_m.id>>(8*i)&uint32(255)); */
    //         counter++;
    //     }

    //     for (uint i=0;i<bytes(_m.method).length;i++)
    //     {
    //         _data[counter]=bytes(_m.method)[i];
    //         counter++;
    //     }

    //     for (uint i=0;i<abi.encodePacked(_m.callback).length;i++)
    //     {
    //         _data[counter]=abi.encodePacked(_m.callback)[i];
    //         counter++;
    //     }

    //     for (uint i=0;i<_m.params.length;i++)
    //     {
    //         _data[counter]=_m.params[i];
    //         counter++;
    //     }

    //     for (uint i=0;i<4;i++)
    //     {
    //         /** _data[counter]=bytes(_m.amount>>(8*i)&uint32(255)); */
    //         counter++;
    //     }

    //     return (_data);
    // }

    // function messageStructFromBytes(bytes memory _data) private pure returns(Message memory m) {
    //     for (uint i=0;i<4;i++)
    //         {
    //             uint32 temp = uint8(_data[i]);
    //             temp<<=8*i;
    //             m.id^=temp;
    //         }

    //     bytes memory str = new bytes(_data.length-4);

    //     for (uint i=0;i<_data.length-4;i++)
    //         {
    //             str[i]=_data[i+4];
    //         }

    //     m.method=string(str);

    //     // Function needs finishing

    //     return m;
    // }    

    // function callFunction(string calldata _chainId, address _address, string calldata _method, uint8 _callback, bytes calldata _params, uint32 _amount) external {
    //     Message memory _message;
    //     _message = Message(1, _method, _callback, _params, _amount, _address);
    //     bytes memory _bytesMessage = messageStructToBytes(_message);
    //     bytes memory _options;
    //     sendToRemoteChain(_chainId, abi.encodePacked(_address), _bytesMessage, _options);
    // }

    // function sendToRemoteChain(string memory _destinationChain, bytes memory _destinationAddress, bytes memory _message, bytes memory _options) private {
    //     // call CCIP
    //     Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

    //     /**
    //     message = {
    //         "chain": _destinationChain,
    //         "address": _destinationAddress,
    //         "message": _message,
    //         "options": _options,
    //     }
    //     */

    //     request.add("action", _destinationChain);
    //     request.addBytes("from", _destinationAddress);
    //     request.addBytes("to", _message);
    //     request.addBytes("chainId", _options);

    //     // Sends the request
    //     sendChainlinkRequestTo(OracleAddress, request, fee);
    // }
    
    function setJobId(string memory _jobId) public {
        jobId = stringToBytes32(_jobId);
    }

    function testCcip() public {
        // call CCIP
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        bytes memory m = "helloworld";

        uint256 i = bytesToUint(m);
        // string memory m = "helloworld";

        request.addUint("key", i);
        // request.add("key", m);

        // Sends the request
        sendChainlinkRequestTo(OracleAddress, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, bytes memory _message) public recordChainlinkFulfillment(_requestId)
    {
        emit Success(_message);
    }


    // function receiveFromRemoteChain(bytes calldata _bridgeId, bytes calldata _sourceChain, bytes calldata _sourceAddress, bytes calldata _message) external {
    //     // receive from ccip and call executeMessage
    //     Message memory _messageStruct;
    //     _messageStruct = messageStructFromBytes(_message);
    //     executeMessage(_messageStruct);
    // }

    // function executeMessage(Message memory _message) private {
    //     // execute the chosen function and prepare callback if required
    //     address toCall = _message.destination;
    //     (bool success, bytes memory data) = toCall.call{value: msg.value, gas: 5000}(
    //         abi.encodeWithSignature("foo(string,uint256)", "call foo", 123)
    //     );
    //     emit FunctionExecuted(success, toCall, _message.method);
    //     if (_message.callback == 1) {
    //         // make the callback a string, if string not null ...
    //     }
    // }

    //** CONTRACT GOVERNANCE **//
    function setOwner(address _address) external {
        require(msg.sender == owner, "Only the owner can set a new owner");
        owner = _address;
    }

    function getOwner() external view returns(address) {
        return owner;
    }

}

// To do
// Add openZeppelin proxy contract framework
// Fix message to bytes function
// Fix bytes to message function
// Add callback feature
// Add events
// Add any other governance related functions
// Build constructor
// Link to Chainlink
// Write tests
// Deploy to testnet