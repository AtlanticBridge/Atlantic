// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

contract TestContract {
    
    uint foo;
    string bar;

    constructor() public {
        foo = 10;
    }

    function setFoo(uint _foo) external {
        foo = _foo;
    }

    function getFoo() external view returns(uint) {
        return foo;
    }
}
