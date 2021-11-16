// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@chainlink/contracts/src/v0.6/vendor/BufferChainlink.sol";


interface MessageInterface {
    struct Message {
        uint64 id;
        string method;
        address callback;
        uint32 amount;
        address destination;
        BufferChainlink.buffer buf;
    }
}