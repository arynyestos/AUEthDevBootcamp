// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library Prime {
    function dividesEvenly(uint _num1, uint _num2) public pure returns (bool){
        return (_num1 % _num2 == 0);
    }
}