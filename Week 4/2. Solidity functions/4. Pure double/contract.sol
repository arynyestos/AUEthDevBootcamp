// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {

    function double(uint num) external pure returns(uint double){
        double = 2*num;
    }
}