// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

contract TestContract {
    
    uint32 foo;
    string bar;

    constructor() public {
        foo = 10;
    }

    function setFoo(uint32 _foo) external returns(uint32) {
        foo = _foo;
        return foo;
    }

    function getFoo() external view returns(uint32) {
        return foo;
    }

    fallback() external payable {
    }
}
