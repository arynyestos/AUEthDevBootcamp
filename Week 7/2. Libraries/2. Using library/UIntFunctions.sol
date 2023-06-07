// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library UIntFunctions {
    function isEven(uint _num) public pure returns (bool){
        return (_num % 2 == 0);
    }
}