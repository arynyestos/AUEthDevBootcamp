// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    function sum(uint[] memory _uintArray) external pure returns(uint){
        uint sum;
        for(uint i = 0; i<_uintArray.length; i++){
            sum += _uintArray[i];
        }
        return sum;
    }
}