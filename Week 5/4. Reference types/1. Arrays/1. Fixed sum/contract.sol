// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    function sum(uint[5] memory _uintArray) external pure returns(uint) {
        uint arraySum;
        for(uint i = 0; i < 5; i++) {
            arraySum += _uintArray[i];
        }
        return arraySum;
    }
}