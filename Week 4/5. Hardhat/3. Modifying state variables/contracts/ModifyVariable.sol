//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ModifyVariable {
  uint public x;
  string public someString;

  constructor(uint _x, string memory _someString) {
    x = _x;
    someString = _someString;
  }

  function modifyToLeet() public {
    x = 1337;
    someString = "Modified string";
  }

}