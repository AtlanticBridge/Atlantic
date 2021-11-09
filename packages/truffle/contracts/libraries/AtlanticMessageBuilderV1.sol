// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import { BufferChainlink } from "@chainlink/contracts/src/v0.6/vendor/BufferChainlink.sol";
import { CBORChainlink } from "@chainlink/contracts/src/v0.6/vendor/CBORChainlink.sol";

library AtlanticMessageBuilderV1 {
    uint256 internal constant defaultBufferSize = 256; // solhint-disable-line const-name-snakecase

    using CBORChainlink for BufferChainlink.buffer;
    
    struct CallbackMessage {
        uint64 id;
        uint capacity;
        BufferChainlink.buffer buf;
    }

    /**
     * @notice Initializes a Chainlink request
     * @dev Sets the ID, callback address, and callback function signature on the request
     * @param self The uninitialized request
     * @param _id The Job Specification ID
     * @return The initialized request
     */
  function initialize(
    CallbackMessage memory self,
    uint64 _id,
    uint _capacity
  ) internal pure returns (AtlanticMessageBuilderV1.CallbackMessage memory) {
    BufferChainlink.init(self.buf, defaultBufferSize);
    self.id = _id;
    self.capacity = _capacity;
    // self.callbackFunctionId = _callbackFunction;
    return self;
  }

  /**
   * @notice Sets the data for the buffer without encoding CBOR on-chain
   * @dev CBOR can be closed with curly-brackets {} or they can be left off
   * @param self The initialized request
   * @param _data The CBOR data
   */
  function setBuffer(CallbackMessage memory self, bytes memory _data)
    internal pure
  {
    BufferChainlink.init(self.buf, _data.length);
    BufferChainlink.append(self.buf, _data);
  }

  /**
   * @notice Adds a string value to the request with a given key name
   * @param self The initialized request
   * @param _key The name of the key
   * @param _value The string value to add
   */
  function add(CallbackMessage memory self, string memory _key, string memory _value)
    internal pure
  {
    self.buf.encodeString(_key);
    self.buf.encodeString(_value);
  }

  /**
   * @notice Adds a bytes value to the request with a given key name
   * @param self The initialized request
   * @param _key The name of the key
   * @param _value The bytes value to add
   */
  function addBytes(CallbackMessage memory self, string memory _key, bytes memory _value)
    internal pure
  {
    self.buf.encodeString(_key);
    self.buf.encodeBytes(_value);
  }

  /**
   * @notice Adds a int256 value to the request with a given key name
   * @param self The initialized request
   * @param _key The name of the key
   * @param _value The int256 value to add
   */
  function addInt(CallbackMessage memory self, string memory _key, int256 _value)
    internal pure
  {
    self.buf.encodeString(_key);
    self.buf.encodeInt(_value);
  }

  /**
   * @notice Adds a uint256 value to the request with a given key name
   * @param self The initialized request
   * @param _key The name of the key
   * @param _value The uint256 value to add
   */
  function addUint(CallbackMessage memory self, string memory _key, uint256 _value)
    internal pure
  {
    self.buf.encodeString(_key);
    self.buf.encodeUInt(_value);
  }

  /**
   * @notice Adds an array of strings to the request with a given key name
   * @param self The initialized request
   * @param _key The name of the key
   * @param _values The array of string values to add
   */
  function addStringArray(CallbackMessage memory self, string memory _key, string[] memory _values)
    internal pure
  {
    self.buf.encodeString(_key);
    self.buf.startArray();
    for (uint256 i = 0; i < _values.length; i++) {
      self.buf.encodeString(_values[i]);
    }
    self.buf.endSequence();
  }
}
