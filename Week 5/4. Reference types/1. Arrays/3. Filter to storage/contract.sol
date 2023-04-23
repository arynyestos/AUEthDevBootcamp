// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
    uint[] public evenNumbers;

    function filterEven(uint[] memory _numbers) external{
        for(uint i = 0; i<_numbers.length; i++){
            if(_numbers[i] % 2 == 0) evenNumbers.push(_numbers[i]);
        }
    }
}